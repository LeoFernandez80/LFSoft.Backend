import { PrismaClient, EnumDocumentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 50; i++) {
    await prisma.document.create({
      data: {
        personName: `Persona ${i}`,
        personId: i,
        personDocumentType: 'DNI',
        personDocumentNumber: `${10000000 + i}`,
        documentDescription: `Documento de prueba ${i}`,
        documentStatus: EnumDocumentStatus.inCreation,
        creationUserId: 1,
        items: {
          create: [
            {
              itemId: 1,
              itemDescription: `Item 1 Doc ${i}`,
              details: {
                create: [
                  { detailId: 1, detailDescription: `Detalle 1-1 Doc ${i}` },
                  { detailId: 2, detailDescription: `Detalle 1-2 Doc ${i}` },
                ],
              },
            },
            {
              itemId: 2,
              itemDescription: `Item 2 Doc ${i}`,
              details: {
                create: [
                  { detailId: 1, detailDescription: `Detalle 2-1 Doc ${i}` },
                ],
              },
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
