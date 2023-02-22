import { Router } from 'express';
import { multerStorage, useStorage } from '../../Config/multer.config.js';
import WorkerController from './worker.controller.js';


class WorkerRouter extends WorkerController {
  path = '/workers';
  router = Router();
  upload = multerStorage(useStorage('Profiles/Sellers'));

  constructor() {
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}/`, this.getAllSeller);

    // Get User by id Router
    this.router.get(`${this.path}/:id`, this.getSellerById);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteSellerById);

    // Update User Router
    this.router.put(`${this.path}/:id`, this.upload.single('photo'), this.updateSellerById);
  }
}

export default WorkerRouter;
