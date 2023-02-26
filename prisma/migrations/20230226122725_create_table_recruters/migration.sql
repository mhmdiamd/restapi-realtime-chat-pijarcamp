-- CreateTable
CREATE TABLE "recruters" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "company_name" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "role" VARCHAR(100) NOT NULL DEFAULT 'recruter',
    "phone" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "photo" VARCHAR(100) NOT NULL,
    "background_photo" VARCHAR(100) NOT NULL,
    "instagram" VARCHAR(100) NOT NULL,
    "linkedin" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "recruters_id_key" ON "recruters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "recruters_email_key" ON "recruters"("email");
