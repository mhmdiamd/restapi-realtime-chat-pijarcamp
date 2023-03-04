import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { auth, deletePhoto } from '../../Config/googleDrive.config.js';
import HttpException from '../Exceptions/http.exceptions.js';

class MessageModel {
  prisma = new PrismaClient()

  getMessageByIdWorker = async (id, readStatus) => {
    const messages = await this.prisma.messages.findMany({
      include: {
        category_message: {
          select: {
            name: true
          }
        }
      },
      where: {
        id_worker: id,
        read_status: readStatus || 1
      },
      orderBy: [
        // Ordering and sorting data workers
        {
          read_status: 'asc',
        },
      ],
    });

    if (messages.length == 0) {
      throw new HttpException(404, `messages with ID Worker ${id} is not found!`);
    }
    return messages
  }

  getMessageByIdRecruter = async (id, readStatus) => {
    const messages = await this.prisma.messages.findMany({
      where: {
        id_recruter: id,
        read_status: readStatus || 1
      },
      orderBy: [
        // Ordering and sorting data message
        {
          read_status: 'asc',
        },
      ],
    });

    if (messages.length == 0) {
      throw new HttpException(404, `messages with ID Recruter ${id} is not found!`);
    }
    return messages
  }
  // Get single User
  getMessageById = async (id) => {
    const message = await this.prisma.messages.findUnique({
      include: {
        worker: {
          select: {
            name: true,
            email: true
          }
        },
        recruter: {
          select: {
            name: true,
            company_name: true,
            phone: true
          }
        }
      },
      where : {
        id: id
      }
    })
    if(message){
      return message
    }
    throw new HttpException(404, 'message not found!')
  };

  createMessage = async (data) => {
    data = {
      id: randomUUID(),
      ...data
    }
    const createMessage = await this.prisma.messages.create({
      data: data
    })
    return createMessage
  }

  // Delete User
  deleteMessageById = async (id) => {
    const message = await this.getMessageById(id)
    if(message){
      // Delete Photo from google drive
      await deletePhoto(auth, message.photo.split('=')[1])
      const deleteMessage = await this.prisma.messages.delete({
        where: {
          id: id,
        },
      });
  
      return deleteMessage
    }

    throw new HttpException(404, `messages with Id ${id} is not found!`);
   
  };

  // Update Recruter by Id
  updateMessageById = async (id, data) => {
    const portofolio = await this.prisma.messages.update({
      data: data,
      where : {
        id: id
      }
    })

    return portofolio

  };
}

export default MessageModel;
