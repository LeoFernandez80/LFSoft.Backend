-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "codigoAsy" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "listprice" DOUBLE PRECISION DEFAULT 0,
    "revendedorsPrice" DOUBLE PRECISION DEFAULT 0,
    "codigoProvider" TEXT,
    "descriptionProvider" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
