-- CreateEnum
CREATE TYPE "EnumQuoteStates" AS ENUM ('quoteInMaking', 'quoteSent', 'quoteApproved', 'quoteRejected', 'quoteCancelled');

-- CreateTable
CREATE TABLE "quotes" (
    "quoteId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "quoteDescription" TEXT NOT NULL,
    "quoteCreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quoteStateId" "EnumQuoteStates" NOT NULL DEFAULT 'quoteInMaking',
    "quoteTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("quoteId")
);

-- CreateTable
CREATE TABLE "quote_items" (
    "quoteId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemDescription" TEXT NOT NULL,
    "itemUnitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "quote_items_pkey" PRIMARY KEY ("quoteId","itemId")
);

-- CreateTable
CREATE TABLE "quote_item_articles" (
    "quoteId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemArticleId" INTEGER NOT NULL,
    "itemArticleQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemArticleAssembly" TEXT NOT NULL,
    "itemArticleDescription" TEXT NOT NULL,
    "itemArticleUnitPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "itemArticleTotalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "quote_item_articles_pkey" PRIMARY KEY ("quoteId","itemId","itemArticleId")
);

-- AddForeignKey
ALTER TABLE "quote_items" ADD CONSTRAINT "quote_items_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes"("quoteId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_item_articles" ADD CONSTRAINT "quote_item_articles_quoteId_itemId_fkey" FOREIGN KEY ("quoteId", "itemId") REFERENCES "quote_items"("quoteId", "itemId") ON DELETE CASCADE ON UPDATE CASCADE;
