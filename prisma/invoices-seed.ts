import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const documentTypes = ['DNI', 'CUIT', 'CUIL', 'Pasaporte'];
const products = [
  { name: 'Laptop Dell', code: 'DELL001', price: 850.00 },
  { name: 'Mouse Logitech', code: 'LOG001', price: 25.50 },
  { name: 'Teclado Mecánico', code: 'TEC001', price: 120.00 },
  { name: 'Monitor Samsung 24"', code: 'SAM001', price: 280.00 },
  { name: 'Auriculares Sony', code: 'SONY001', price: 95.00 },
  { name: 'Webcam HD', code: 'WEB001', price: 65.00 },
  { name: 'Hub USB', code: 'HUB001', price: 35.00 },
  { name: 'Cable HDMI', code: 'HDMI001', price: 15.00 },
  { name: 'Disco SSD 1TB', code: 'SSD001', price: 180.00 },
  { name: 'RAM 16GB', code: 'RAM001', price: 95.00 },
];

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log('Starting invoice seeding...');

  for (let i = 1; i <= 100; i++) {
    const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items por factura
    const invoiceDate = getRandomDate(new Date(2024, 0, 1), new Date());
    const sentDate = new Date(invoiceDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000); // 0-7 días después
    
    let totalInvoice = 0;
    const items = [];

    for (let j = 1; j <= numItems; j++) {
      const numDetails = Math.floor(Math.random() * 3) + 1; // 1-3 detalles por item
      let totalItem = 0;
      const details = [];

      for (let k = 1; k <= numDetails; k++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 10) + 1;
        const unitPrice = product.price;
        const totalDetail = quantity * unitPrice;
        
        totalItem += totalDetail;

        details.push({
          detailId: k,
          detailCode: product.code,
          detailDescription: product.name,
          detailQuantity: quantity,
          detailUnitPrice: unitPrice,
          detailTotalPrice: totalDetail,
        });
      }

      totalInvoice += totalItem;

      items.push({
        itemId: j,
        itemDescription: `Item ${j} - Productos de tecnología`,
        itemQuantity: details.reduce((sum, d) => sum + d.detailQuantity, 0),
        itemTotalPrice: totalItem,
        details: {
          create: details,
        },
      });
    }

    await prisma.invoice.create({
      data: {
        personName: `Cliente ${i}`,
        personId: i,
        personDocumentType: documentTypes[Math.floor(Math.random() * documentTypes.length)],
        personDocumentNumber: `${20000000 + i}`,
        invoiceDescription: `Factura de venta ${i}`,
        invoiceCreationDate: invoiceDate,
        invoiceSentDate: sentDate,
        creationUserId: Math.floor(Math.random() * 5) + 1,
        invoiceTotalPrice: Math.round(totalInvoice * 100) / 100,
        items: {
          create: items,
        },
      },
    });

    if (i % 10 === 0) {
      console.log(`Created ${i} invoices...`);
    }
  }

  console.log('✅ Successfully created 100 invoices with items and details!');
}

main()
  .catch((e) => {
    console.error('Error seeding invoices:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
