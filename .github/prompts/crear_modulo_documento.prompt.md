---
agent: agent
---
# Guía para Crear un Módulo NestJS - Estándar Invoice

Esta guía te permitirá crear un módulo completo siguiendo los patrones, estructura y estándares del módulo Invoice.

## 📋 Antes de Empezar

**Información necesaria:**
- [ ] Nombre de la entidad (singular): Ejemplo: `Order`, `Payment`, `Shipment`
- [ ] Nombre plural para controlador/servicio: Ejemplo: `orders`, `payments`, `shipments`
- [ ] Librería donde se ubicará: `libs/sales`, `libs/utilities`, etc.
- [ ] ¿Tiene items anidados? (Si/No)
- [ ] ¿Tiene details dentro de items? (Si/No)
- [ ] Campos del modelo principal

---

## 🎯 Estructura de Archivos a Crear

```
libs/{library}/src/
  └── {entity}/
      ├── {entity}.module.ts
      ├── {entities}.service.ts
      ├── {entities}.controller.ts
      └── dto/
          ├── {entity}.dto.ts
          ├── {entity}-filter.dto.ts
          ├── {entity}-item.dto.ts (si tiene items)
          └── {entity}-item-detail.dto.ts (si tiene details)
```

**Ejemplo con "Order":**
```
libs/sales/src/
  └── order/
      ├── order.module.ts
      ├── orders.service.ts
      ├── orders.controller.ts
      └── dto/
          ├── order.dto.ts
          ├── order-filter.dto.ts
          ├── order-item.dto.ts
          └── order-item-detail.dto.ts
```

---

## 📝 PASO 1: Crear Schema en Prisma

**Archivo:** `prisma/schema.prisma`

### Template para modelo principal:

```prisma
model Order {
  orderId              Int       @id @default(autoincrement())
  
  // Información de la persona/cliente
  personName           String
  personId             Int
  personDocumentType   String
  personDocumentNumber String
  
  // Campos específicos del negocio
  orderDescription     String
  orderCreationDate    DateTime  @default(now())
  orderDeliveryDate    DateTime?
  orderTotalPrice      Float     @default(0)
  
  // Usuario que creó
  creationUserId       Int
  
  // Soft delete y auditoría
  isActive             Boolean   @default(true)
  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt

  // Relación con items
  items                OrderItem[]

  @@map("orders")
}
```

### Template para items (si aplica):

```prisma
model OrderItem {
  orderId          Int
  itemId           Int
  itemDescription  String
  itemQuantity     Float     @default(0)
  itemTotalPrice   Float     @default(0)
  
  // Relación con order
  order            Order @relation(fields: [orderId], references: [orderId], onDelete: Cascade)
  
  // Relación con details
  details          OrderItemDetail[]

  @@id([orderId, itemId])
  @@map("order_items")
}
```

### Template para details (si aplica):

```prisma
model OrderItemDetail {
  orderId            Int
  itemId             Int
  detailId           Int
  detailCode         String?
  detailDescription  String
  detailQuantity     Float     @default(0)
  detailUnitPrice    Float     @default(0)
  detailTotalPrice   Float     @default(0)
  
  // Relación con item
  item               OrderItem @relation(fields: [orderId, itemId], references: [orderId, itemId], onDelete: Cascade)

  @@id([orderId, itemId, detailId])
  @@map("order_item_details")
}
```

### Ejecutar migración y generar cliente:

```bash
# Crear migración y aplicarla a la base de datos
npm run prisma:migrate
# Cuando solicite el nombre, ingresar: "add_order_models"

# Esto automáticamente ejecuta prisma:generate
# Si solo necesitas regenerar el cliente sin migración:
npm run prisma:generate
```

**Nota:** `prisma:migrate` crea la migración, actualiza la base de datos Y genera el cliente de Prisma automáticamente.

---

## 📝 PASO 2: Crear DTOs

### 2.1. Detail DTO (si aplica)

**Archivo:** `libs/{library}/src/{entity}/dto/{entity}-item-detail.dto.ts`

```typescript
import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class OrderItemDetailDto {
  @IsNumber()
  detailId: number;

  @IsOptional()
  @IsString()
  detailCode?: string;

  @IsString()
  detailDescription: string;

  @IsNumber()
  @Min(0)
  detailQuantity: number;

  @IsNumber()
  @Min(0)
  detailUnitPrice: number;

  @IsNumber()
  @Min(0)
  detailTotalPrice: number;
}
```

### 2.2. Item DTO (si aplica)

**Archivo:** `libs/{library}/src/{entity}/dto/{entity}-item.dto.ts`

```typescript
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsArray, ValidateNested, Min } from 'class-validator';
import { OrderItemDetailDto } from './{entity}-item-detail.dto';

export class OrderItemDto {
  @IsNumber()
  itemId: number;

  @IsString()
  itemDescription: string;

  @IsNumber()
  @Min(0)
  itemQuantity: number;

  @IsNumber()
  @Min(0)
  itemTotalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDetailDto)
  details: OrderItemDetailDto[];
}
```

### 2.3. DTO Principal

**Archivo:** `libs/{library}/src/{entity}/dto/{entity}.dto.ts`

```typescript
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsArray, ValidateNested, IsOptional, Min } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  // Información de la persona
  @IsString()
  personName: string;

  @IsNumber()
  personId: number;

  @IsString()
  personDocumentType: string;

  @IsString()
  personDocumentNumber: string;

  // Campos específicos del negocio
  @IsString()
  orderDescription: string;

  @IsDate()
  @Type(() => Date)
  orderCreationDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  orderDeliveryDate?: Date;

  @IsNumber()
  creationUserId: number;

  @IsNumber()
  @Min(0)
  orderTotalPrice: number;

  // Items anidados
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
```

### 2.4. Filter DTO

**Archivo:** `libs/{library}/src/{entity}/dto/{entity}-filter.dto.ts`

```typescript
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class OrderFilterDto {
  @IsOptional()
  @IsString()
  personName?: string;

  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsOptional()
  @IsString()
  personDocumentType?: string;

  @IsOptional()
  @IsString()
  personDocumentNumber?: string;

  @IsOptional()
  @IsString()
  orderDescription?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  orderCreationDate?: Date;

  @IsOptional()
  @IsNumber()
  creationUserId?: number;
}
```

---

## 📝 PASO 3: Crear Service

**Archivo:** `libs/{library}/src/{entity}/{entities}.service.ts`

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PageFilterDto, PaginatedListDto, PrismaService } from '@libs/shared';
import { OrderDto } from './dto/order.dto';
import { OrderFilterDto } from './dto/order-filter.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: OrderFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 10, sortField = 'orderCreationDate', sortDirection = 'desc' } = pageFilter;

    const where: any = { isActive: true };

    // Aplicar filtros
    if (filter.personName) {
      where.personName = { contains: filter.personName, mode: 'insensitive' };
    }
    if (filter.personId) {
      where.personId = filter.personId;
    }
    if (filter.orderDescription) {
      where.orderDescription = { contains: filter.orderDescription, mode: 'insensitive' };
    }
    if (filter.creationUserId) {
      where.creationUserId = filter.creationUserId;
    }

    const total = await this.prisma.order.count({ where });

    const data = await this.prisma.order.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });

    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { orderId: id },
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(createOrderDto: OrderDto) {
    const { items, ...orderData } = createOrderDto;

    return this.prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items.map(item => ({
            itemId: item.itemId,
            itemDescription: item.itemDescription,
            itemQuantity: item.itemQuantity,
            itemTotalPrice: item.itemTotalPrice,
            details: {
              create: item.details.map(detail => ({
                detailId: detail.detailId,
                detailCode: detail.detailCode,
                detailDescription: detail.detailDescription,
                detailQuantity: detail.detailQuantity,
                detailUnitPrice: detail.detailUnitPrice,
                detailTotalPrice: detail.detailTotalPrice,
              })),
            },
          })),
        },
      },
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });
  }

  async update(id: number, updateOrderDto: OrderDto) {
    await this.findOne(id);

    const { items, ...orderData } = updateOrderDto;

    return this.prisma.order.update({
      where: { orderId: id },
      data: {
        ...orderData,
        ...(items && {
          items: {
            deleteMany: {},
            create: items.map(item => ({
              itemId: item.itemId,
              itemDescription: item.itemDescription,
              itemQuantity: item.itemQuantity,
              itemTotalPrice: item.itemTotalPrice,
              details: {
                create: item.details.map(detail => ({
                  detailId: detail.detailId,
                  detailCode: detail.detailCode,
                  detailDescription: detail.detailDescription,
                  detailQuantity: detail.detailQuantity,
                  detailUnitPrice: detail.detailUnitPrice,
                  detailTotalPrice: detail.detailTotalPrice,
                })),
              },
            })),
          },
        }),
      },
      include: {
        items: {
          include: {
            details: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.order.update({
      where: { orderId: id },
      data: { isActive: false },
    });
  }
}
```

---

## 📝 PASO 4: Crear Controller

**Archivo:** `libs/{library}/src/{entity}/{entities}.controller.ts`

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '@libs/security';
import { PageFilterDto } from '@libs/shared';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: OrderFilterDto) {
    return this.ordersService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Post()
  create(@Body() createOrderDto: OrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: OrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
```

---

## 📝 PASO 5: Crear Module

**Archivo:** `libs/{library}/src/{entity}/{entity}.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrderModule {}
```

---

## 📝 PASO 6: Actualizar Index Exports

**Archivo:** `libs/{library}/src/index.ts`

Agregar al final del archivo:

```typescript
export * from './{entity}/{entity}.module';
export * from './{entity}/{entities}.service';
export * from './{entity}/{entities}.controller';
export * from './{entity}/dto/{entity}.dto';
export * from './{entity}/dto/{entity}-filter.dto';
export * from './{entity}/dto/{entity}-item.dto';
export * from './{entity}/dto/{entity}-item-detail.dto';
```

**Ejemplo:**
```typescript
export * from './order/order.module';
export * from './order/orders.service';
export * from './order/orders.controller';
export * from './order/dto/order.dto';
export * from './order/dto/order-filter.dto';
export * from './order/dto/order-item.dto';
export * from './order/dto/order-item-detail.dto';
```

---

## 📝 PASO 7: Registrar Module en App

**Si es una nueva librería, actualizar:** `src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { OrderModule } from '@libs/sales';

@Module({
  imports: [
    // ... otros módulos
    OrderModule,
  ],
})
export class AppModule {}
```

---

## 📝 PASO 8: Crear Seed (Opcional)

**Archivo:** `prisma/orders-seed.ts`

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedOrders() {
  console.log('Seeding orders...');

  const orders = [
    {
      personName: 'Juan Pérez',
      personId: 1,
      personDocumentType: 'DNI',
      personDocumentNumber: '12345678',
      orderDescription: 'Orden de prueba 1',
      orderCreationDate: new Date(),
      orderTotalPrice: 1500.0,
      creationUserId: 1,
      items: {
        create: [
          {
            itemId: 1,
            itemDescription: 'Item 1',
            itemQuantity: 2,
            itemTotalPrice: 1000.0,
            details: {
              create: [
                {
                  detailId: 1,
                  detailCode: 'DET001',
                  detailDescription: 'Detalle 1',
                  detailQuantity: 2,
                  detailUnitPrice: 500.0,
                  detailTotalPrice: 1000.0,
                },
              ],
            },
          },
          {
            itemId: 2,
            itemDescription: 'Item 2',
            itemQuantity: 1,
            itemTotalPrice: 500.0,
            details: {
              create: [
                {
                  detailId: 1,
                  detailCode: 'DET002',
                  detailDescription: 'Detalle 2',
                  detailQuantity: 1,
                  detailUnitPrice: 500.0,
                  detailTotalPrice: 500.0,
                },
              ],
            },
          },
        ],
      },
    },
  ];

  for (const order of orders) {
    await prisma.order.create({ data: order });
  }

  console.log('Orders seeded successfully');
}
```

**Actualizar:** `prisma/seed.ts` o archivo principal de seeds

```typescript
import { seedOrders } from './orders-seed';

async function main() {
  // ... otros seeds
  await seedOrders();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## 🧪 PASO 9: Testing

### 9.1. Compilar

```bash
npm run build
```

### 9.2. Ejecutar seeds (opcional)

```bash
npx prisma db seed
```

### 9.3. Iniciar servidor

```bash
npm run start:dev
```

### 9.4. Probar endpoints

**Obtener token de autenticación:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'
```

**Crear orden:**
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "personName": "Juan Pérez",
    "personId": 1,
    "personDocumentType": "DNI",
    "personDocumentNumber": "12345678",
    "orderDescription": "Orden de prueba",
    "orderCreationDate": "2025-12-16T00:00:00.000Z",
    "creationUserId": 1,
    "orderTotalPrice": 1500.0,
    "items": [
      {
        "itemId": 1,
        "itemDescription": "Item 1",
        "itemQuantity": 2,
        "itemTotalPrice": 1000.0,
        "details": [
          {
            "detailId": 1,
            "detailCode": "DET001",
            "detailDescription": "Detalle 1",
            "detailQuantity": 2,
            "detailUnitPrice": 500.0,
            "detailTotalPrice": 1000.0
          }
        ]
      }
    ]
  }'
```

**Listar órdenes:**
```bash
curl -X GET "http://localhost:3000/orders?page=1&pageSize=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Obtener una orden:**
```bash
curl -X GET http://localhost:3000/orders/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Actualizar orden:**
```bash
curl -X PATCH http://localhost:3000/orders/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "orderDescription": "Orden actualizada",
    "orderTotalPrice": 2000.0
  }'
```

**Eliminar orden (soft delete):**
```bash
curl -X DELETE http://localhost:3000/orders/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✅ Checklist Final

- [ ] Schema Prisma creado con modelo principal, items y details
- [ ] Migración ejecutada y cliente generado (`npm run prisma:migrate`)
- [ ] DTO de detail creado con validaciones
- [ ] DTO de item creado con validaciones y `@ValidateNested`
- [ ] DTO principal creado con todas las validaciones
- [ ] Filter DTO creado con `@IsOptional` en todos los campos
- [ ] Service creado con todos los métodos CRUD
- [ ] Controller creado con `@UseGuards(JwtAuthGuard)`
- [ ] Module creado y exporta el service
- [ ] Index.ts actualizado con todos los exports
- [ ] Module registrado en `app.module.ts`
- [ ] Código compilado sin errores (`npm run build`)
- [ ] Servidor inicia correctamente (`npm run start:dev`)
- [ ] Endpoints protegidos (401 sin token)
- [ ] POST crea correctamente con items y details
- [ ] GET lista con paginación
- [ ] GET by ID retorna con relaciones
- [ ] PATCH actualiza correctamente
- [ ] DELETE hace soft delete (isActive: false)

---

## 📚 Convenciones Importantes

### Nombres de archivos:
- **Service:** `{entities}.service.ts` (plural)
- **Controller:** `{entities}.controller.ts` (plural)
- **Module:** `{entity}.module.ts` (singular)
- **DTOs:** `{entity}.dto.ts` (singular)

### Nombres de clases:
- **Service:** `{Entities}Service` (PascalCase plural)
- **Controller:** `{Entities}Controller` (PascalCase plural)
- **Module:** `{Entity}Module` (PascalCase singular)
- **DTO:** `{Entity}Dto` (PascalCase singular)

### Rutas:
- **Controller:** `@Controller('{entities}')` (lowercase plural)
- **Endpoints:** REST estándar (GET, POST, PATCH, DELETE)

### Base de datos:
- **Tabla:** `{entities}` (lowercase plural)
- **Map:** `@@map("{entities}")` (snake_case plural)
- **ID:** `{entity}Id` (camelCase singular + Id)

### Validaciones:
- Todos los campos con decoradores de `class-validator`
- Fechas y objetos con `@Type()` de `class-transformer`
- Arrays anidados con `@ValidateNested({ each: true })`
- Cantidades y precios con `@Min(0)`
- Campos opcionales con `@IsOptional()`

### Soft Delete:
- Usar campo `isActive: Boolean @default(true)`
- En remove: `{ isActive: false }`
- En findAll: `where: { isActive: true }`

---

## 🎯 Resumen de Pasos

1. ✅ Crear schema en Prisma (modelo + items + details)
2. ✅ Ejecutar migración
3. ✅ Crear DTOs (detail → item → principal → filter)
4. ✅ Crear Service (findAll, findOne, create, update, remove)
5. ✅ Crear Controller (con @UseGuards y @Patch)
6. ✅ Crear Module (exportar service)
7. ✅ Actualizar exports en index.ts
8. ✅ Registrar module en app.module.ts
9. ✅ Compilar y probar

**¡Listo! Tu módulo está completo y siguiendo todos los estándares.** 🚀
