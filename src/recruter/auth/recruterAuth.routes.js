import { Router } from 'express';
import { recruterRegisterSchema } from './recruterAuth.validation.js';
import RecruterAuthController from './recruterAuth.controller.js';
import { recruterEmailActivation } from '../../Helpers/emailActivation.js';


class RecruterAuthRouter extends RecruterAuthController {
  path = '/auth/recruters';
  router = Router();

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
    // get all Route
    this.router.post(`${this.path}/register`, recruterRegisterSchema, this.register);
    // get single category Route
    this.router.post(`${this.path}/login`, this.login);

    // Buyer Email Activation
    this.router.get(`/recruters/verification/:token`, recruterEmailActivation);
  }
}

export default RecruterAuthRouter;
