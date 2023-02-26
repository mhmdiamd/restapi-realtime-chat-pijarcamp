-- CreateTable
CREATE TABLE "messages" (
    "id" VARCHAR(100) NOT NULL,
    "id_worker" VARCHAR(100) NOT NULL,
    "id_recruter" VARCHAR(100) NOT NULL,
    "purpose" VARCHAR(255) NOT NULL,
    "recruter_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "read_status" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "messages_id_key" ON "messages"("id");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_worker_fkey" FOREIGN KEY ("id_worker") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_recruter_fkey" FOREIGN KEY ("id_recruter") REFERENCES "recruters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
