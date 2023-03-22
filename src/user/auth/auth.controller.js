import HttpException from "../../Exceptions/http.exceptions.js";
import { successResponse } from "../../Helpers/response.js";
import UserModel from "../user.model.js";
import UserService from "./auth.service.js";

class AuthController {
  userService = new UserService()

  // user Login
  login = async (req, res, next) => {
    const { email, password } = req.body
    try {
      const user = await this.userService.login(email, password)
      
      res.cookie('access_token', user.token, {
        httpOnly: true,
        maxAge: (1 / 2) * 60 * 60 * 1000,
        sameSite: 'none',
        secure: 'false',
      });
      
      return successResponse(res, 200, 'Login Success', user)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }

  // User Register
  register = async (req, res, next) => {
    const newUser = new UserModel(req.body)
    try {
      const createUser = await newUser.save()
      const { password, ...dataUser } = createUser._doc
      return successResponse(res, 200, 'Register Success!', dataUser)
    } catch (err) {
      next(new HttpException(err.status, err.message))
    }
  }
}

export default AuthController;
