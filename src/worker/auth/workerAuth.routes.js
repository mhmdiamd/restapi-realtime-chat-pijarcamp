import { Router } from 'express';
import multer from 'multer';
import { workerEmailActivation } from '../../Helpers/emailActivation.js';
import WorkerAuthController from './workerAuth.controller.js';
import { workerRegisterSchema } from './workerAuth.validation.js';


class WorkerAuthRouter extends WorkerAuthController {
  path = '/auth/workers';
  router = Router();
  upload = multer();

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    // get all Route
    this.router.post(`${this.path}/register`, this.upload.any(), workerRegisterSchema, this.register);

    // get single category Route
    this.router.post(`${this.path}/login`, this.login);

    // User Verification
    this.router.get(`/workers/verification/:token`, workerEmailActivation
    );
  }
}

export default WorkerAuthRouter;
