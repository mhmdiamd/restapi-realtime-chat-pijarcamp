import { Router } from 'express';
import PortofolioController from './portofolio.controller.js';
import { authCheck } from './../../Middlewares/auth.middleware.js';
import { multerStorage } from '../../../Config/multer.config.js';
import { useStorage } from './../../../Config/multer.config.js';


class PortofolioRouter extends PortofolioController{
  path = '/portofolios';
  router = Router();
  upload = multerStorage(useStorage(''))

  constructor() {
    // running Router
    super();
    this.initialiseRoute();
  } 

  // Initialise Router
  initialiseRoute() {
    // Get all Portofolio Router
    this.router.get(`${this.path}/workers/:idWorker`, this.getPortofolioByIdWorker);

     // Get Portofolio by id Router
     this.router.post(`${this.path}`, authCheck, this.upload.single('photo') ,this.createPortofolio);

    // Get Portofolio by id Router
    this.router.get(`${this.path}/:id`, this.getPortofolioById);


    // Delete Portofolio Router
    this.router.delete(`${this.path}/:id`, this.deletePortofolioById);
    
    // Update Portofolio Router
    this.router.put(`${this.path}/:id`, authCheck, this.upload.single('photo'), this.updatePortofolioById);
  }
}

export default PortofolioRouter;
