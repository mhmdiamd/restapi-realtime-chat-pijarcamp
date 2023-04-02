import { Router } from 'express';
import { multerStorage, useStorage } from '../../Config/multer.config.js';
import { authCheck } from '../Middlewares/auth.middleware.js';
import MessageController from './message.controller.js';


class MessageRouter extends MessageController {
  path = '/messages'
  router = Router();
  upload = multerStorage(useStorage('Profiles/Sellers'));

  constructor() {
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    this.router.put(`${this.path}/:id`, authCheck, this.sendMessage)
    this.router.put(`${this.path}/group/:id`, authCheck, this.sendMessageGroup)
    this.router.get(`${this.path}/chat/:id`, this.getMessageByChatId)
    this.router.put(`${this.path}/chat/delete/:id`, this.deleteMessageById)
    this.router.put(`${this.path}/chat/edit/:id`, this.updateMessageById)
  }
}

export default MessageRouter;
