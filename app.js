import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cluster from 'cluster';
import os from 'os';
import process from 'process';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import errorMiddleware from './src/Middlewares/error.middleware.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'

class App {
  filename = fileURLToPath(import.meta.url);
  dirname = path.dirname(this.filename);
  upload = multer();

  constructor(routers, port) {
    dotenv.config()
    this.app = express();
    this.port = port;

    this.#initialiseDatabaseConnection()
    this.#initialiseMiddleware();
    this.#initialiseRouters(routers);
    this.#initialiseErrorHandling();
  }

  // Initialise Middleware
  #initialiseMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors({
      origin: process.env.ORIGIN_DOMAIN, 
      methods: "GET, POST, PUT, DELETE",
      credentials: true
    }));
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(xss());
    this.app.use(cookieParser());    
  }
  #initialiseErrorHandling() {
    this.app.use(errorMiddleware);
    this.app.use((req, res, next) => {
      res.status(404).json({
        message: 'Routes not found!',
      });
    });
  }

  // Initialise Controllers
  #initialiseRouters(routers) {
    routers.forEach((router) => {
      this.app.use('/api/v1', router.router);
    });
  }
  async #initialiseDatabaseConnection(){
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    mongoose.set('strictQuery', false); 
    try{
      const connect = await mongoose.connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
      );
      if (connect) {
          console.log('Connected to DB');
      }
    }catch(err){
      console.log(err)
    }
  }

  // Lister Server
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Running with worker id ${process.pid} on port ${this.port}`);
    });
  }
}

export default App;
