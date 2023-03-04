import { Router } from 'express';
import { authCheck } from '../../Middlewares/auth.middleware.js';
import ExperienceController from './experience.controller.js';



class ExperienceRouter extends ExperienceController{
  path = '/experiences';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  } 

  // Initialise Router
  initialiseRoute() {
    // Get all Experience Router
    this.router.get(`${this.path}/workers/:idWorker`, this.getExperienceByIdWorker);

     // Get Experience by id Router
     this.router.post(`${this.path}/`, authCheck ,this.createExperience);

    // Get Experience by id Router
    this.router.get(`${this.path}/:id`, this.getExperienceById);

    // Delete Experience Router
    this.router.delete(`${this.path}/:id`, authCheck, this.deleteExperienceById);

    // Update Experience Router
    this.router.put(`${this.path}/:id`, this.updateExperienceById);
  }
}

export default ExperienceRouter;
