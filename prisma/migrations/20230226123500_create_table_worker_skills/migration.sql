-- CreateTable
CREATE TABLE "worker_skills" (
    "id" VARCHAR(255) NOT NULL,
    "id_worker" VARCHAR(255) NOT NULL,
    "id_skill" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "worker_skills_id_key" ON "worker_skills"("id");

-- AddForeignKey
ALTER TABLE "worker_skills" ADD CONSTRAINT "worker_skills_id_worker_fkey" FOREIGN KEY ("id_worker") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "worker_skills" ADD CONSTRAINT "worker_skills_id_skill_fkey" FOREIGN KEY ("id_skill") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
