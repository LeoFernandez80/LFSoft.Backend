-- CreateTable
CREATE TABLE "invoices" (
    "invoiceId" SERIAL NOT NULL,
    "personName" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "personDocumentType" TEXT NOT NULL,
    "personDocumentNumber" TEXT NOT NULL,
    "invoiceDescription" TEXT NOT NULL,
    "invoiceCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoiceSentDate" TIMESTAMP(3) NOT NULL,
    "creationUserId" INTEGER NOT NULL,
    "invoiceTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoiceId")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "invoiceId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "itemQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("invoiceId","itemId")
);

-- CreateTable
CREATE TABLE "invoice_item_details" (
    "invoiceId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "detailId" INTEGER NOT NULL,
    "detailCode" TEXT,
    "detailDescription" TEXT NOT NULL,
    "detailQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "detailUnitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "detailTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "invoice_item_details_pkey" PRIMARY KEY ("invoiceId","itemId","detailId")
);

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("invoiceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_item_details" ADD CONSTRAINT "invoice_item_details_invoiceId_itemId_fkey" FOREIGN KEY ("invoiceId", "itemId") REFERENCES "invoice_items"("invoiceId", "itemId") ON DELETE CASCADE ON UPDATE CASCADE;
