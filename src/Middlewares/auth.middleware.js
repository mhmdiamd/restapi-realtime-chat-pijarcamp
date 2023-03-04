import jwt from 'jsonwebtoken';
import HttpException from '../Exceptions/http.exceptions.js';


// Authenticate Middleware
export const authCheck = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new HttpException(401, 'Unauthenticate, access denied!'));
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return next(new HttpException(403, 'Token is invalid'));
    }
    req.user = payload;
    return next();
  });
};

export const isUser = async (req, res, next) => {
  authCheck(req, res, () => {
    if (req.user.id == req.params.id) {
      return next();
    }

    next(new HttpException(401, 'Unauthorized, you not have access!'));
  });
};
