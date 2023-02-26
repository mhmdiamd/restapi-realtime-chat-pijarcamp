-- CreateTable
CREATE TABLE "skills" (
    "id" VARCHAR(255) NOT NULL,
    "skill" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "skills_id_key" ON "skills"("id");

-- CreateIndex
CREATE UNIQUE INDEX "skills_skill_key" ON "skills"("skill");
