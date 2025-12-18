import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding customers...');

  const nombres = [
    'Juan', 'María', 'Carlos', 'Ana', 'Luis', 'Carmen', 'José', 'Laura', 'Miguel', 'Elena',
    'Francisco', 'Isabel', 'Antonio', 'Rosa', 'Manuel', 'Patricia', 'Pedro', 'Cristina', 'Javier', 'Marta',
    'Raúl', 'Sofía', 'Diego', 'Lucía', 'Sergio', 'Paula', 'Andrés', 'Natalia', 'Fernando', 'Victoria',
    'Ricardo', 'Beatriz', 'Alberto', 'Sandra', 'Roberto', 'Silvia', 'Alejandro', 'Carolina', 'Óscar', 'Adriana'
  ];

  const apellidos = [
    'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín',
    'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez',
    'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Suárez',
    'Molina', 'Castro', 'Ortega', 'Rubio', 'Marín', 'Sanz', 'Iglesias', 'Núñez', 'Medina', 'Garrido'
  ];

  const ciudades = [
    'Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'San Miguel de Tucumán', 'Mar del Plata',
    'Salta', 'Santa Fe', 'San Juan', 'Resistencia', 'Neuquén', 'Posadas', 'Bahía Blanca', 'Paraná',
    'Santiago del Estero', 'Corrientes', 'San Salvador de Jujuy', 'Río Cuarto', 'Comodoro Rivadavia'
  ];

  const provincias = [
    'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Salta', 'Entre Ríos', 'Misiones',
    'Chaco', 'Corrientes', 'Santiago del Estero', 'San Juan', 'Jujuy', 'Río Negro', 'Neuquén',
    'Formosa', 'Chubut', 'San Luis', 'Catamarca', 'La Rioja', 'La Pampa', 'Santa Cruz', 'Tierra del Fuego'
  ];

  const tiposDocumento = ['DNI', 'CUIL', 'CUIT', 'Pasaporte', 'CI'];

  const customers = [];

  for (let i = 1; i <= 100; i++) {
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
    const provincia = provincias[Math.floor(Math.random() * provincias.length)];
    const tipoDoc = tiposDocumento[Math.floor(Math.random() * tiposDocumento.length)];
    const documento = `${20000000 + Math.floor(Math.random() * 20000000)}`;
    const telefono = `11${Math.floor(10000000 + Math.random() * 90000000)}`;
    const codigoPostal = `${1000 + Math.floor(Math.random() * 8000)}`;

    customers.push({
      nombre: nombre,
      apellido: apellido,
      razonSocial: `${nombre} ${apellido}`,
      documento: documento,
      tipoDocumento: tipoDoc,
      telefono: telefono,
      email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}${i}@email.com`,
      direccion: `Calle ${apellido} ${100 + i}`,
      ciudad: ciudad,
      provincia: provincia,
      codigoPostal: codigoPostal,
      activo: Math.random() > 0.1, // 90% activos
    });
  }

  // Insertar en la base de datos
  for (const customer of customers) {
    await prisma.customer.create({
      data: customer,
    });
  }

  console.log(`${customers.length} customers created successfully`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
