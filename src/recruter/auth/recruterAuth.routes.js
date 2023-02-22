import { Router } from 'express';
import { buyerEmailActivation } from '../../auth/emailActivation.js';
import { recruterRegisterSchema } from './recruterAuth.validation.js';
import RecruterAuthController from './recruterAuth.controller';


class RecruterAuthRouter extends RecruterAuthController {
  path = '/auth/routers';
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
    this.router.get(`/customers/verification/:token`, buyerEmailActivation);
  }
}

export default RecruterAuthRouter;
