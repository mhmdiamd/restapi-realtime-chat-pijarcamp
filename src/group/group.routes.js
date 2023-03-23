import { Router } from 'express';
import { multerStorage, useStorage } from '../../Config/multer.config.js';
import { authCheck } from '../Middlewares/auth.middleware.js';
import GroupController from './group.controller.js';

class GroupRouter extends GroupController {
  path = '/groups'
  router = Router();
  upload = multerStorage(useStorage('Profiles/Sellers'));

  constructor() {
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    this.router.post(`${this.path}`, authCheck, this.createGroupChat)
    this.router.get(`${this.path}`, authCheck, this.getGroupChat)
    this.router.put(`${this.path}/:id`, authCheck, this.addGroupMember)
  }
}

export default GroupRouter;
