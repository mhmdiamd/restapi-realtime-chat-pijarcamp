import { Router } from 'express';
import { multerStorage, useStorage } from '../../Config/multer.config.js';
import { authCheck } from '../Middlewares/auth.middleware.js';
import UserChatController from './userChat.controller.js'

class UserChatRouter extends UserChatController {
  path = '/user-chats'
  router = Router();
  upload = multerStorage(useStorage('Profiles/Sellers'));

  constructor() {
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    this.router.post(`${this.path}`, authCheck, this.createUserChat)
    this.router.get(`${this.path}`, authCheck, this.getUserChat)
  }
}

export default UserChatRouter;
