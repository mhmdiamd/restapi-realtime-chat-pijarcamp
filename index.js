import App from './app.js';
import WorkerRouter from './src/worker/worker.routes.js';
import WorkerAuthRouter from './src/worker/auth/workerAuth.routes.js';


process.setMaxListeners(0);

const app = new App([new WorkerRouter(), new WorkerAuthRouter()], 3001);

app.listen();
