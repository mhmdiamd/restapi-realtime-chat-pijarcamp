import App from './app.js';
import WorkerRouter from './src/worker/worker.routes.js';
import WorkerAuthRouter from './src/worker/auth/workerAuth.routes.js';
import RecruterRouter from './src/recruter/recruter.routes.js';
import RecruterAuthRouter from './src/recruter/auth/recruterAuth.routes.js';


process.setMaxListeners(0);

const app = new App([new WorkerRouter(), new WorkerAuthRouter(), new RecruterRouter(), new RecruterAuthRouter()], 3001);

app.listen();
