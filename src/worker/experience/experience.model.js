import { dbRepo } from '../../../Config/db.config.js';
import { PrismaClient } from '@prisma/client';
import HttpException from '../../Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';

class ExperienceModel {
  prisma = new PrismaClient()

  getExperienceByIdWorker = async (id) => {
    const experiences = await this.prisma.experiences.findMany({
      where: {
        id_worker: id,
      },
    });

    if (experiences.length == 0) {
      throw new HttpException(404, `Experiences with ID Worker ${id} is not found!`);
    }
    return experiences
  }

  // Get single User
  getExperienceById = async (id) => {
      const experience = await this.prisma.experiences.findUnique({
        where : {
          id: id
        }
      })
      if(experience){
        return experience
      }
      throw new HttpException(404, 'Experience not found!')
  };

  createExperience = async (data) => {
    data = {
      id: randomUUID(),
      ...data
    }
    const experience = await this.prisma.experiences.create({
      data: data
    })
    return experience
  }

  // Delete User
  deleteExperienceById = async (id) => {
    await this.getExperienceById(id)
    const experience = await this.prisma.experiences.delete({
      where : {
        id: id
      }
    })

    return experience
  };

  // Update Recruter by Id
  updateExperienceById = async (id, data) => {
    await this.getExperienceById(id);
    const experience = await this.prisma.experiences.update({
      data: data,
      where : {
        id: id
      }
    })

    return experience
   
  };
}

export default ExperienceModel;
