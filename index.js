import App from './app.js';
import MessageRouter from './src/message/message.routes.js';
import TokenRouter from './src/token/token.routes.js';
import AuthRouter from './src/user/auth/auth.routes.js';
import UserRouter from './src/user/user.routes.js';
import UserChatRouter from './src/UserChat/UserChat.routes.js';

process.setMaxListeners(0);
const app = new App([new AuthRouter(), new UserRouter(), new UserChatRouter(), new MessageRouter(),new TokenRouter()], 3001);

app.listen();
