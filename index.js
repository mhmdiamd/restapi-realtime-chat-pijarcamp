import App from './app.js';
import WorkerRouter from './src/worker/worker.routes.js';
import WorkerAuthRouter from './src/worker/auth/workerAuth.routes.js';
import RecruterRouter from './src/recruter/recruter.routes.js';
import RecruterAuthRouter from './src/recruter/auth/recruterAuth.routes.js';
import PortofolioRouter from './src/worker/portofolio/portofolio.routes.js';
import ExperienceRouter from './src/worker/experience/experience.routes.js';
import WorkerSkillRouter from './src/worker/worker_skill/workerSkill.routes.js';
import TokenRouter from './src/token/token.routes.js';
import MessageRouter from './src/message/message.routes.js';

process.setMaxListeners(0);

const app = new App([new WorkerRouter(), new WorkerAuthRouter(), new RecruterRouter(), new RecruterAuthRouter(), new PortofolioRouter(), new ExperienceRouter(), new WorkerSkillRouter(), new TokenRouter(), new MessageRouter()], 3001);

app.listen();
