import { Router } from 'express';
import { multerStorage, useStorage } from '../../Config/multer.config.js';
import { authCheck } from '../Middlewares/auth.middleware.js';
import UserController from './user.controller.js';

class UserRouter extends UserController {
  path = '/users'
  router = Router();
  upload = multerStorage(useStorage('Profiles/Sellers'));

  constructor() {
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    this.router.put(`${this.path}/add-contact`, authCheck, this.addContact)
    this.router.put(`${this.path}/edit/:id`, authCheck, this.upload.single('photo'), this.updateUser)
    this.router.get(`${this.path}`, authCheck, this.getAllUser)
  }
}

export default UserRouter;
