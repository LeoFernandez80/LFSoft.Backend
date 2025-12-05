# LFSoft Security API

API de seguridad para LFSoft con autenticación JWT.

## Instalación

```bash
npm install
```

## Configuración

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Variables de entorno:
- `DATABASE_URL`: URL de conexión a PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT
- `JWT_EXPIRATION`: Tiempo de expiración del token (ej: 7d)
- `PORT`: Puerto del servidor (default: 3002)
- `FRONTEND_URL`: URL del frontend para CORS

## Base de datos

```bash
# Generar cliente Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# Ver base de datos
npm run prisma:studio
```

## Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Endpoints

### Auth
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Users (requiere autenticación)
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario por ID

## Puerto

Esta API corre en el puerto **3002** por defecto.
