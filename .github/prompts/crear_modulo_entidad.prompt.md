---
agent: agent
---
# Guía para Crear un Módulo de Entidad Simple - Estándar Articles

Esta guía te permitirá crear un módulo completo siguiendo los patrones, estructura y estándares del módulo **Articles** (entidad simple sin relaciones complejas).

---

## 📋 Antes de Empezar

**Información necesaria:**
- [ ] Nombre de la entidad (singular en inglés): Ejemplo: `Product`, `Category`, `Client`
- [ ] Nombre plural para rutas/archivos: Ejemplo: `products`, `categories`, `clients`
- [ ] Librería donde se ubicará: `libs/articles`, `libs/sales`, `libs/utilities`, etc.
- [ ] Campos del modelo (nombres, tipos, validaciones)
- [ ] Campos que serán filtrables
- [ ] Campo de ordenamiento por defecto

---

## 🎯 Estructura de Archivos a Crear

```
libs/{library}/src/
  └── {entities}/           # Carpeta en plural
      ├── {entities}.module.ts
      ├── {entities}.service.ts
      ├── {entities}.controller.ts
      └── dto/
          ├── {entity}.dto.ts           # DTO único para crear/actualizar
          └── {entity}-filter.dto.ts    # Filtros para búsqueda
```

**Ejemplo con "Product":**
```
libs/articles/src/
  └── products/
      ├── products.module.ts
      ├── products.service.ts
      ├── products.controller.ts
      └── dto/
          ├── product.dto.ts
          └── product-filter.dto.ts
```

---

## 📝 PASO 1: Crear Schema en Prisma

**Archivo:** `prisma/schema.prisma`

### Template básico:

```prisma
model Product {
  id                  Int      @id @default(autoincrement())
  
  // Campos específicos de tu entidad
  code                String
  name                String
  description         String?
  price               Float?   @default(0)
  stock               Int?     @default(0)
  category            String?
  
  // Soft delete y auditoría (SIEMPRE incluir)
  isActive            Boolean  @default(true)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  @@map("products")  // Nombre de la tabla en base de datos (plural)
}
```

**Reglas importantes:**
- ✅ ID siempre: `id Int @id @default(autoincrement())`
- ✅ Soft delete: `isActive Boolean @default(true)`
- ✅ Auditoría: `createdAt` y `updatedAt`
- ✅ `@@map("nombre_tabla")` en plural y snake_case si es necesario
- ✅ Campos opcionales con `?`: `description String?`
- ✅ Valores por defecto con `@default(valor)`

### Ejecutar migración y generar cliente:

```bash
# Crear migración y aplicarla a la base de datos
npm run prisma:migrate
# Cuando solicite el nombre, ingresar: "add_product_model"

# Esto automáticamente ejecuta prisma:generate
# Si solo necesitas regenerar el cliente sin migración:
npm run prisma:generate
```

**Nota:** `prisma:migrate` crea la migración, actualiza la base de datos Y genera el cliente de Prisma automáticamente.

---

## 📝 PASO 2: Crear DTOs

### 2.1. Crear archivo de DTO principal

**Archivo:** `libs/{library}/src/{entities}/dto/{entity}.dto.ts`

```typescript
import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class ProductDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
```

**Reglas:**
- ✅ Un solo DTO para crear y actualizar
- ✅ Todos los campos opcionales con `@IsOptional()`
- ✅ Incluir campo `id` como opcional
- ✅ Usar decoradores de validación apropiados:
  - `@IsString()` para textos
  - `@IsNumber()` para números
  - `@IsBoolean()` para booleanos
  - `@Min(0)` para valores positivos
  - `@IsOptional()` para todos los campos

### 2.2. Crear DTO de filtros

**Archivo:** `libs/{library}/src/{entities}/dto/{entity}-filter.dto.ts`

```typescript
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
```

**Reglas:**
- ✅ Solo campos que se usarán para filtrar
- ✅ Todos los campos con `@IsOptional()`
- ✅ `@Type(() => Number)` para números que vienen de query params
- ✅ No incluir campos de auditoría

---

## 📝 PASO 3: Crear Service

**Archivo:** `libs/{library}/src/{entities}/{entities}.service.ts`

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { PrismaService, PageFilterDto, PaginatedListDto } from '@libs/shared';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: ProductFilterDto, pageFilter: PageFilterDto): Promise<PaginatedListDto<any>> {
    const { page = 1, pageSize = 5, sortField = 'createdAt', sortDirection = 'desc' } = pageFilter;
    
    const where: any = { isActive: true };

    // Aplicar filtros
    if (filters.id) {
      where.id = filters.id;
    }

    if (filters.code) {
      where.code = {
        contains: filters.code,
        mode: 'insensitive',
      };
    }

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.category) {
      where.category = {
        contains: filters.category,
        mode: 'insensitive',
      };
    }

    const total = await this.prisma.product.count({ where });

    const data = await this.prisma.product.findMany({
      where,
      orderBy: { [sortField]: sortDirection },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new PaginatedListDto(data, total);
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async create(productDto: ProductDto) {
    return this.prisma.product.create({
      data: productDto,
    });
  }

  async update(id: number, productDto: ProductDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: productDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
```

**Reglas importantes:**
- ✅ Inyectar `PrismaService` en el constructor
- ✅ `findAll`: Paginación + filtros + soft delete (`isActive: true`)
- ✅ Búsqueda de texto: `contains` + `mode: 'insensitive'`
- ✅ `findOne`: Lanzar `NotFoundException` si no existe
- ✅ `create`: Crear directamente con el DTO
- ✅ `update`: Verificar existencia primero
- ✅ `remove`: Soft delete (actualizar `isActive` a `false`)

---

## 📝 PASO 4: Crear Controller

**Archivo:** `libs/{library}/src/{entities}/{entities}.controller.ts`

```typescript
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@libs/security';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { PageFilterDto } from '@libs/shared';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll(@Query() pageFilter: PageFilterDto, @Query() filters: ProductFilterDto) {
    return this.productsService.findAll(filters, pageFilter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  create(@Body() productDto: ProductDto) {
    return this.productsService.create(productDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productsService.update(+id, productDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
```

**Reglas:**
- ✅ `@Controller('nombre-ruta')` en plural y kebab-case
- ✅ `@UseGuards(JwtAuthGuard)` para proteger endpoints
- ✅ Verbos HTTP estándar:
  - `@Get()` para listar
  - `@Get(':id')` para obtener uno
  - `@Post()` para crear
  - `@Patch(':id')` para actualizar
  - `@Delete(':id')` para eliminar
- ✅ `@Query()` para filtros y paginación
- ✅ `@Body()` para DTOs
- ✅ `@Param('id')` convertir a número con `+id`

---

## 📝 PASO 5: Crear Module

**Archivo:** `libs/{library}/src/{entities}/{entities}.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
```

**Reglas:**
- ✅ Registrar controller en `controllers`
- ✅ Registrar service en `providers`
- ✅ Exportar service en `exports` (para usar en otros módulos)

---

## 📝 PASO 6: Exportar en Index

**Archivo:** `libs/{library}/src/index.ts`

Agregar la exportación del módulo:

```typescript
export * from './{entities}/{entities}.module';
```

**Ejemplo:**
```typescript
export * from './products/products.module';
```

Si no existe el archivo, créalo con todas las exportaciones necesarias.

---

## 📝 PASO 7: Registrar en App Module

**Archivo:** `src/app.module.ts`

Importar y registrar el módulo:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from '@libs/articles'; // Ajustar según la librería

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ... otros módulos
    ProductsModule,  // ✅ Agregar aquí
  ],
})
export class AppModule {}
```

---

## 📝 PASO 8: Probar los Endpoints

### Iniciar el servidor:
```bash
npm run start:dev
```

### Endpoints disponibles:

1. **GET** `/products` - Listar con paginación y filtros
   ```
   /products?page=1&pageSize=10&sortField=name&sortDirection=asc&name=laptop
   ```

2. **GET** `/products/:id` - Obtener uno
   ```
   /products/1
   ```

3. **POST** `/products` - Crear
   ```json
   {
     "code": "PROD001",
     "name": "Laptop",
     "description": "High performance laptop",
     "price": 1200,
     "stock": 50,
     "category": "Electronics"
   }
   ```

4. **PATCH** `/products/:id` - Actualizar
   ```json
   {
     "price": 1100,
     "stock": 45
   }
   ```

5. **DELETE** `/products/:id` - Eliminar (soft delete)

---

## ✅ Checklist Final

- [ ] Modelo creado en `schema.prisma` con campos de auditoría
- [ ] Migración ejecutada y cliente generado (`npm run prisma:migrate`)
- [ ] DTO creado (`{entity}.dto.ts` con todos los campos opcionales)
- [ ] DTO de filtros creado (`{entity}-filter.dto.ts`)
- [ ] Service creado con los 5 métodos estándar
- [ ] Controller creado con los 5 endpoints estándar
- [ ] Module creado con exports
- [ ] Módulo exportado en `index.ts` de la librería
- [ ] Módulo registrado en `app.module.ts`
- [ ] Servidor inicia sin errores
- [ ] Endpoints funcionan correctamente

---

## 🎨 Convenciones de Nombres

| Concepto | Formato | Ejemplo |
|----------|---------|---------|
| Entidad (singular) | PascalCase | `Product` |
| Tabla en DB | snake_case plural | `products` |
| Carpeta | kebab-case plural | `products/` |
| Archivos | kebab-case plural | `products.service.ts` |
| Clase Service | PascalCase plural | `ProductsService` |
| Clase Controller | PascalCase plural | `ProductsController` |
| Clase Module | PascalCase plural | `ProductsModule` |
| Ruta HTTP | kebab-case plural | `/products` |
| DTOs | PascalCase singular | `ProductDto` |

---

## 🔧 Decoradores Comunes de Validación

```typescript
// Strings
@IsString()
@MinLength(3)
@MaxLength(100)
@IsEmail()
@IsUrl()

// Numbers
@IsNumber()
@Min(0)
@Max(100)
@IsInt()
@IsPositive()

// Booleans
@IsBoolean()

// Dates
@IsDate()
@Type(() => Date)

// Arrays
@IsArray()
@ArrayMinSize(1)

// Opcionales
@IsOptional()

// Enums
@IsEnum(MyEnum)
```

---

## 📚 Recursos

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [class-validator Decorators](https://github.com/typestack/class-validator#validation-decorators)
- [NestJS Controllers](https://docs.nestjs.com/controllers)
- [NestJS Providers](https://docs.nestjs.com/providers)

---

## 💡 Tips Adicionales

1. **Siempre usar soft delete**: Nunca borrar físicamente, usar `isActive: false`
2. **Validar existencia antes de actualizar/eliminar**: Usar `findOne` primero
3. **Búsquedas case-insensitive**: Usar `mode: 'insensitive'` en Prisma
4. **Paginación por defecto**: `page=1`, `pageSize=5`
5. **Ordenamiento por defecto**: `createdAt desc` (más recientes primero)
6. **Todos los endpoints protegidos**: Usar `@UseGuards(JwtAuthGuard)`
7. **Un solo DTO**: Todos los campos opcionales para crear y actualizar
8. **Filtros opcionales**: Todos los campos en FilterDto con `@IsOptional()`
9. **Validar en el service**: La lógica de negocio y validaciones van en el service

---

¡Listo! Siguiendo esta guía tendrás un módulo funcional en menos de 30 minutos. 🚀
