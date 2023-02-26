-- CreateTable
CREATE TABLE "experiences" (
    "id" VARCHAR(100) NOT NULL,
    "id_worker" VARCHAR(100) NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "company_photo" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "career_start" DATE NOT NULL,
    "career_end" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "experiences_id_key" ON "experiences"("id");

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_id_worker_fkey" FOREIGN KEY ("id_worker") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
