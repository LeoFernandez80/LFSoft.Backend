import { PrismaClient, EnumQuoteStates } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedQuotes() {
  console.log('Seeding quotes...');

  const states = [
    EnumQuoteStates.quoteInMaking,
    EnumQuoteStates.quoteSent,
    EnumQuoteStates.quoteApproved,
    EnumQuoteStates.quoteRejected,
  ];

  const customers = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María García' },
    { id: 3, name: 'Carlos López' },
    { id: 4, name: 'Ana Martínez' },
    { id: 5, name: 'Pedro Rodríguez' },
    { id: 6, name: 'Laura Fernández' },
    { id: 7, name: 'Diego Sánchez' },
    { id: 8, name: 'Sofía Torres' },
    { id: 9, name: 'Miguel Ramírez' },
    { id: 10, name: 'Carmen Flores' },
  ];

  const products = [
    { name: 'Escritorio Ejecutivo', basePrice: 450 },
    { name: 'Silla Ergonómica', basePrice: 280 },
    { name: 'Estantería Modular', basePrice: 320 },
    { name: 'Mesa de Reuniones', basePrice: 850 },
    { name: 'Archivador Metálico', basePrice: 180 },
    { name: 'Pizarra Blanca', basePrice: 120 },
    { name: 'Lámpara de Escritorio', basePrice: 65 },
    { name: 'Computadora Portátil', basePrice: 1200 },
    { name: 'Monitor LED 24"', basePrice: 350 },
    { name: 'Teclado y Mouse', basePrice: 85 },
  ];

  const articles = [
    { name: 'Madera MDF', price: 35 },
    { name: 'Tornillos y Herrajes', price: 12 },
    { name: 'Pintura y Acabado', price: 28 },
    { name: 'Vidrio Templado', price: 45 },
    { name: 'Metal Cromado', price: 52 },
    { name: 'Ruedas Giratorias', price: 18 },
    { name: 'Bisagras', price: 8 },
    { name: 'Manijas', price: 15 },
    { name: 'Espuma Alta Densidad', price: 38 },
    { name: 'Tela Tapicería', price: 42 },
  ];

  for (let i = 1; i <= 100; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items
    const creationDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

    let quoteTotalPrice = 0;
    const quoteItems = [];

    for (let j = 1; j <= numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const itemQuantity = Math.floor(Math.random() * 5) + 1; // 1-5 unidades
      const numArticles = Math.floor(Math.random() * 3) + 2; // 2-4 articles por item

      let itemUnitPrice = 0;
      const itemArticles = [];

      for (let k = 1; k <= numArticles; k++) {
        const article = articles[Math.floor(Math.random() * articles.length)];
        const articleQuantity = Math.floor(Math.random() * 3) + 1; // 1-3 unidades
        const articleUnitPrice = article.price + Math.random() * 20 - 10; // Variación de precio
        const articleTotalPrice = articleQuantity * articleUnitPrice;

        itemUnitPrice += articleTotalPrice;

        itemArticles.push({
          itemArticleId: k,
          itemArticleQuantity: articleQuantity,
          itemArticleAssembly: `ASM-${i}-${j}-${k}`,
          itemArticleDescription: article.name,
          itemArticleUnitPrice: Math.round(articleUnitPrice * 100) / 100,
          itemArticleTotalPrice: Math.round(articleTotalPrice * 100) / 100,
        });
      }

      const itemTotalPrice = itemQuantity * itemUnitPrice;
      quoteTotalPrice += itemTotalPrice;

      quoteItems.push({
        itemId: j,
        itemQuantity: itemQuantity,
        itemDescription: product.name,
        itemUnitPrice: Math.round(itemUnitPrice * 100) / 100,
        itemTotalPrice: Math.round(itemTotalPrice * 100) / 100,
        articles: {
          create: itemArticles,
        },
      });
    }

    await prisma.quote.create({
      data: {
        customerId: customer.id,
        quoteDescription: `Cotización ${i} - ${customer.name} - ${products[Math.floor(Math.random() * products.length)].name}`,
        quoteCreationDate: creationDate,
        quoteStateId: state,
        quoteTotalPrice: Math.round(quoteTotalPrice * 100) / 100,
        items: {
          create: quoteItems,
        },
      },
    });

    if (i % 10 === 0) {
      console.log(`Created ${i} quotes...`);
    }
  }

  console.log('✅ 100 quotes seeded successfully');
}

// Si se ejecuta directamente este archivo
if (require.main === module) {
  seedQuotes()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
