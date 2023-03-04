import { Router } from 'express';
import { authCheck } from '../../Middlewares/auth.middleware.js';
import WorkerSkillController from './workerSkill.controller.js';


class WorkerSkillRouter extends WorkerSkillController{
  path = '/worker-skills';
  router = Router();

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  } 

  // Initialise Router
  initialiseRoute() {
    // Get all Experience Router
    this.router.get(`${this.path}/workers/:idWorker`, this.getWorkerSkillByIdWorker);

     // Get Experience by id Router
     this.router.post(`${this.path}/`, authCheck ,this.createWorkerSkill);

    // Get Experience by id Router
    this.router.get(`${this.path}/:id`, this.getWorkerSkillById);

    // Delete Experience Router
    this.router.delete(`${this.path}/:id`, authCheck, this.deleteWorkerSkillById);

    // Update Experience Router
    this.router.put(`${this.path}/:id`, this.updateWorkerSkillById);
  }
}

export default WorkerSkillRouter;
