-- CreateEnum
CREATE TYPE "type_app" AS ENUM ('mobile', 'web');

-- AlterTable
ALTER TABLE "recruters" ALTER COLUMN "photo" SET DEFAULT 'photodefault.jpg';

-- AlterTable
ALTER TABLE "workers" ALTER COLUMN "photo" SET DEFAULT 'photodefault.jpg';

-- CreateTable
CREATE TABLE "portofolios" (
    "id" VARCHAR(100) NOT NULL,
    "id_worker" VARCHAR(100) NOT NULL,
    "application_name" VARCHAR(100) NOT NULL,
    "link_repositiory" VARCHAR(100) NOT NULL,
    "type" "type_app" NOT NULL,
    "photo" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "portofolios_id_key" ON "portofolios"("id");

-- AddForeignKey
ALTER TABLE "portofolios" ADD CONSTRAINT "portofolios_id_worker_fkey" FOREIGN KEY ("id_worker") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
