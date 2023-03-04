// import { clearRedisCache, setOrGetCache } from '../../../Config/redis.config.js';
import { auth, createAndUpload, deletePhoto } from '../../Config/googleDrive.config.js';
import HttpException from '../Exceptions/http.exceptions.js';
import { successResponse } from '../Helpers/response.js';
import MessageModel from './message.model.js';

class MessageController {
  #messageModel = new MessageModel();


  getMessageByIdWorker = async (req, res, next) => {
    const { id } = req.user;
    const readStatus = req.query
    try {
      const messages = await this.#messageModel.getMessageByIdWorker(id, readStatus);
      successResponse(res, 200, `Get messages with ID Worker ${id} success!`, messages);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  getMessageByIdRecruter = async (req, res, next) => {
    const { id } = req.user;
    const readStatus = req.query
    try {
      const messages = await this.#messageModel.getMessageByIdRecruter(id, readStatus);
      successResponse(res, 200, `Get messages with ID Recruter ${id} success!`, messages);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  
  createMessage = async (req, res, next) => {
    const {id} = req.user
    try {
      console.log(req.body)
      // Upload To Drive
      if(req.file) {
        const uploadToDrive = await createAndUpload(auth, req.file)
        // Generate photo Url
        const photoLink = `https://drive.google.com/uc?id=${uploadToDrive.id}`
        // Create data to DB
        await this.#messageModel.createMessage({photo: photoLink,id_recruter: id, ...req.body});
      }else {
        // Create data to DB
        await this.#messageModel.createMessage({id_recruter: id, ...req.body});
      }

      // Send Response Success
      successResponse(res, 200, `Create Message success!`, {message : 'Message success created!'});
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Message By Id
  getMessageById = async (req, res, next) => {
    const { id } = req.params;
    try {

      const message = await this.#messageModel.getMessageById(id);
      successResponse(res, 200, `Get Message with ID ${id} success!`, message);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Message
  deleteMessageById = async (req, res, next) => {
    const { id } = req.params;
    try {

      // const getPhotId = await portofolioBeforeDelete.data.photo.split("=")[1]
      // // const deletePhotoFromDrive = await deletePhoto(auth, getPhotId)

      await this.#messageModel.deleteMessageById(id);
      successResponse(res, 200, `Delete Message with ID ${id} success!`, { message: 'Message Deleted!' });

      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Message By Id
  updateMessageById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {

      if(req.file) {
        // Get portoflio by id
        const portofolio = await this.#messageModel.getMessageById(id)
        // Get Id photo
        const getPhotoId = portofolio.photo.split('=')[1]
        // Update Photo in drive
        await updatePhoto(auth, req.file, getPhotoId)
      }

      await this.#messageModel.updateMessageById(id, data);
      // await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return Message;
      // });
      successResponse(res, 200, `Update Message with ID ${id} success!`, { message: 'Message Updated!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default MessageController;
