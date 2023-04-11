import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import process from 'process';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import errorMiddleware from './src/Middlewares/error.middleware.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { createServer } from 'http';
import { Server } from 'socket.io';

class App {
  filename = fileURLToPath(import.meta.url);
  dirname = path.dirname(this.filename);
  upload = multer();

  constructor(routers, port) {
    dotenv.config()
    this.app = express();
    this.httpServer = createServer(this.app)
    this.io = new Server(this.httpServer, {
      cors: {
        origin: process.env.ORIGIN_DOMAIN,
        methods: "GET, POST, PUT, DELETE"
      }
    })
    this.port = port;
    this.activeUsers = []

    this.#initialiseSocketIo()
    this.#initialiseDatabaseConnection()
    this.#initialiseMiddleware();
    this.#initialiseRouters(routers);
    this.#initialiseErrorHandling();
  }

  #initialiseSocketIo() {
    this.io.on("connection", (socket) => {

      this.io.emit(`get-socket-id`, socket.id)
      // Generate user Login!
      socket.on('user-login', (userLoginId) => {
        if (!this.activeUsers.some(activeUser => activeUser.userId == userLoginId)) {
          this.activeUsers.push({
            userId: userLoginId,
            socketId: socket.id
          })
        } else {
          const getUserLogin = this.activeUsers.find(user => user.userId == userLoginId)
    
          if (socket.id != getUserLogin.socketId) {
            const filterActiveUser = this.activeUsers.filter(user => user.userId != userLoginId)
            filterActiveUser.push({
              userId: userLoginId,
              socketId: socket.id
            })
    
            this.activeUsers = filterActiveUser
          }
        }
    
        console.log(this.activeUsers)
    
        this.io.emit('get-users', this.activeUsers)
      })
    
      // Send Message
      socket.on('send-message', (data) => {
        const { receiverId, message, senderId } = data
        console.log(data)
        const user = this.activeUsers.find(user => user.userId == receiverId)
    
        if (user) {
          this.io.to(user.socketId).emit(`receive-data`, {
            text: message,
            senderId
          })
        }
      })
    
      socket.on('disconnect', (userId) => {
        this.activeUsers = this.activeUsers.filter(activeUser => activeUser.userId != userId)
      })
    
      socket.on('logout', ({ userId }) => {
        this.activeUsers = this.activeUsers.filter(activeUser => activeUser.userId != userId)
        this.io.emit('get-users', this.activeUsers)
      })
    });
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
    this.httpServer.listen(this.port, () => {
      console.log(`Server Running with worker id ${process.pid} on port ${this.port}`);
    });
  }
}

export default App;
