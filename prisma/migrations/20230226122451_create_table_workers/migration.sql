-- CreateEnum
CREATE TYPE "worker_category" AS ENUM ('freelance', 'fulltime');

-- CreateTable
CREATE TABLE "workers" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "job_desk" VARCHAR(100) NOT NULL,
    "workplace" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "role" VARCHAR(100) NOT NULL DEFAULT 'worker',
    "phone" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "photo" VARCHAR(100) NOT NULL,
    "worker_category" "worker_category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "workers_id_key" ON "workers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "workers_email_key" ON "workers"("email");
