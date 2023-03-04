import { Router } from 'express';
import { multerStorage, useStorage } from '../../Config/multer.config.js';
import { authCheck } from '../Middlewares/auth.middleware.js';
import MessageController from './message.controller.js';


class MessageRouter extends MessageController{
  path = '/messages';
  router = Router();
  upload = multerStorage(useStorage(''))

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  } 

  // Initialise Router
  initialiseRoute() {
    // Get all Message Router
    this.router.get(`${this.path}/workers`, authCheck, this.getMessageByIdWorker);
    this.router.get(`${this.path}/recruters`, authCheck, this.getMessageByIdRecruter);

     // Get Message by id Router
     this.router.post(`${this.path}`, authCheck, this.upload.single('photo') ,this.createMessage);

    // Get Message by id Router
    this.router.get(`${this.path}/messages/:id`, this.getMessageById);

    // Delete Message Router
    this.router.delete(`${this.path}/:id`, this.deleteMessageById);
    
    // Update Message Router
    this.router.put(`${this.path}/:id`, authCheck, this.upload.single('photo'), this.updateMessageById);
  }
}

export default MessageRouter;
