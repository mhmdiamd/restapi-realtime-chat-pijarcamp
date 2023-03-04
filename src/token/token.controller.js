import jwt from 'jsonwebtoken';
import WorkerModel from '../worker/worker.model.js';
import RecruterModel from '../recruter/recruter.model.js';
import HttpException from '../Exceptions/http.exceptions.js';
import { successResponse } from '../Helpers/response.js';
import { regenerateToken } from './token.service.js';

export const getNewToken = async (req, res, next) => {
  const refreshToken = req.headers.authorization?.split(' ')[1];

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, payload) => {
    if (error) {
      return next(new HttpException(401, 'Refresh Token is Expired!'));
    }
    const { exp, iat, ...other } = payload;
    const { newAccessToken, newRefreshToken } = await regenerateToken(other, refreshToken);
    res.cookie('access_token', newAccessToken, {
      maxAge: (1 / 2) * 60 * 60 * 1000,
      httpOnly: true,
    });
    successResponse(res, 200, 'Success Refresh Token', {
      data: payload,
      token: newRefreshToken,
    });
  });
};

export const logout = async (req, res, next) => {
  res.cookie('access_token', { maxAge: 0 });
  res.status(200).send({
    message: 'Success Logout!',
  });
};

export const getMyData = async (req, res, next) => {
  const workerModel = new WorkerModel();
  const recruterModel = new RecruterModel();
  const user = req.user;
  try {
    let data = '';  
    if (user.role == 'worker') {
      data = await workerModel.getWorkerById(user.id);
    } else {
      data = await recruterModel.getRecruterById(user.id);
    }
    successResponse(res, 200, 'Success get user', { ...data, role: user.role });
  } catch (err) {
    console.log(err);
    next(new HttpException(err.status, err.message));
  }
};
