import { PrismaClient } from '@prisma/client';
import HttpException from '../../Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';

class WorkerSkillModel {
  prisma = new PrismaClient()

  getWorkerSkillByIdWorker = async (id) => {
    const workerSkills = await this.prisma.worker_skills.findMany({
      where: {
        id_worker: id,
      },
    });

    if (workerSkills.length == 0) {
      throw new HttpException(404, `WorkerSkills with ID Worker ${id} is not found!`);
    }
    return workerSkills
  }

  // Get single User
  getWorkerSkillById = async (id) => {
    const workerSkill = await this.prisma.worker_skills.findUnique({
      where : {
        id: id
      }
    })

    return workerSkill
  };

  createWorkerSkill = async (data) => {
    data = {
      id: randomUUID(),
      ...data
    }
    console.log(data)
    const workerSkill = await this.prisma.worker_skills.create({
      data: data
    })
    return workerSkill
  }

  // Delete User
  deleteWorkerSkillById = async (id) => {
    // await this.getWorkerSkillById(id);
    console.log(id)
    const workerSkill = await this.prisma.worker_skills.delete({
      where : {
        id: id
      }
    })

    return workerSkill

  };

  // Update Recruter by Id
  updateWorkerSkillById = async (id, data) => {
    // await this.getWorkerSkillById(id);
    const workerSkill = await this.prisma.worker_skills.update({
      data: data,
      where : {
        id: id
      }
    })

    return workerSkill
   
  };
}

export default WorkerSkillModel;
