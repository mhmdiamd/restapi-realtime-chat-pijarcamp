import { sendEmailActivation } from '../../../Config/nodemailer.config.js';
import WorkerAuthModel from './workerAuth.model.js';
import HttpException from '../../Exceptions/http.exceptions.js';
import { generateRefreshToken, generateToken } from '../../Helpers/token.js';
import { createRefreshToken } from '../../token/token.service.js';
import { successResponse } from '../../Helpers/response.js';

class WorkerAuthController {
  #workerAuthModel = new WorkerAuthModel();

  // User Register
  register = async (req, res, next) => {
    sendEmailActivation(req.user, 'sellers')
      .then((response) => {
        successResponse(res, 200, 'Check your email for activation email!', {});
      })
      .catch((err) => {
        next(new HttpException(500, err.message));
      });
  };

  // User Login
  login = async (req, res, next) => {
    try {
      const userLogin = await this.#workerAuthModel.login(req.body);
      const accessToken = generateToken(userLogin);
      const refreshToken = generateRefreshToken(userLogin);

      res.cookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: (1 / 2) * 60 * 60 * 1000,
      });

      await createRefreshToken(refreshToken);
      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Login success!',
        data: userLogin,
        token: refreshToken,
      });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default WorkerAuthController;
