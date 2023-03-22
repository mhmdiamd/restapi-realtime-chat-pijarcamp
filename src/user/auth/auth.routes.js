import { Router } from 'express';
import multer from 'multer';
import AuthController from './auth.controller.js';
import { userRegisterSchema } from './auth.validation.js';

class AuthRouter extends AuthController {
  path = '/auth';
  router = Router();
  upload = multer();

  constructor() {
    super();
    this.#initialiseRouter();
  }

  #initialiseRouter() {
   this.router.post(`${this.path}/register`, userRegisterSchema, this.register)
   this.router.post(`${this.path}/login`, this.login)
  }
}

export default AuthRouter;
