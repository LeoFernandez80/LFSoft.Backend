-- CreateEnum
CREATE TYPE "EnumDocumentStatus" AS ENUM ('inCreation', 'completed', 'cancelled');

-- CreateTable
CREATE TABLE "documents" (
    "documentId" SERIAL NOT NULL,
    "personName" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "personDocumentType" TEXT NOT NULL,
    "personDocumentNumber" TEXT NOT NULL,
    "documentDescription" TEXT NOT NULL,
    "documentCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentStatus" "EnumDocumentStatus" NOT NULL DEFAULT 'inCreation',
    "creationUserId" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "document_items" (
    "documentId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemDescription" TEXT NOT NULL,

    CONSTRAINT "document_items_pkey" PRIMARY KEY ("documentId","itemId")
);

-- CreateTable
CREATE TABLE "document_item_details" (
    "documentId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "detailId" INTEGER NOT NULL,
    "detailDescription" TEXT NOT NULL,

    CONSTRAINT "document_item_details_pkey" PRIMARY KEY ("documentId","itemId","detailId")
);

-- AddForeignKey
ALTER TABLE "document_items" ADD CONSTRAINT "document_items_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("documentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_item_details" ADD CONSTRAINT "document_item_details_documentId_itemId_fkey" FOREIGN KEY ("documentId", "itemId") REFERENCES "document_items"("documentId", "itemId") ON DELETE CASCADE ON UPDATE CASCADE;
