import { Router } from 'express';
import RecruterController from './recruter.controller.js';


class RecruterRouter extends RecruterController {
  path = '/recruters';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  }

  // Initialise Router
  initialiseRoute() {
    // Get all User Router
    this.router.get(`${this.path}/`, this.getAllRecruter);

    // Get User by id Router
    this.router.get(`${this.path}/:id`, this.getRecruterById);

    // Delete User Router
    this.router.delete(`${this.path}/:id`, this.deleteRecruterById);

    // Update User Router
    this.router.put(`${this.path}/:id`, this.updateRecruterById);
  }
}

export default RecruterRouter;
