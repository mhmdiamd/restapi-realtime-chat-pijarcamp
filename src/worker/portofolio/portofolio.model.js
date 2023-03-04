import { dbRepo } from '../../../Config/db.config.js';
import { PrismaClient } from '@prisma/client';
import HttpException from '../../Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';
import { auth, deletePhoto } from '../../../Config/googleDrive.config.js';

class PortofolioModel {
  prisma = new PrismaClient()

  getPortofolioByIdWorker = async (id) => {
    const portofolios = await this.prisma.portofolios.findMany({
      where: {
        id_worker: id,
      },
    });

    if (portofolios.length == 0) {
      throw new HttpException(404, `Portofolios with ID Worker ${id} is not found!`);
    }
    return portofolios
  }
  // Get single User
  getPortofolioById = async (id) => {
    const portofolio = await this.prisma.portofolios.findUnique({
      where : {
        id: id
      }
    })
    if(portofolio){
      return portofolio
    }
    throw new HttpException(404, 'portofolio not found!')
  };

  createPortofolio = async (data) => {
    data = {
      id: randomUUID(),
      ...data
    }

    const createPortofolio = await this.prisma.portofolios.create({
      data: data
    })
    return createPortofolio
  }

  // Delete User
  deletePortofolioById = async (id) => {
    const portofolio = await this.getPortofolioById(id)
    if(portofolio){
      // Delete Photo from google drive
      await deletePhoto(auth, portofolio.photo.split('=')[1])
      const deletePortofolio = await this.prisma.portofolios.delete({
        where: {
          id: id,
        },
      });
  
      return deletePortofolio
    }

    throw new HttpException(404, `Portofolios with Id ${id} is not found!`);
   
  };

  // Update Recruter by Id
  updatePortofolioById = async (id, data) => {
    const portofolio = await this.prisma.portofolios.update({
      data: data,
      where : {
        id: id
      }
    })

    return portofolio

  };
}

export default PortofolioModel;
