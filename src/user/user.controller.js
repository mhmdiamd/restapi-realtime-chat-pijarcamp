import HttpException from "../Exceptions/http.exceptions.js"
import { successResponse } from "../Helpers/response.js"
import UserService from "./user.service.js"

class UserController {
  userService = new UserService()

  getAllUser = async (req, res, next) => {
    const query = req.query
    try{
      const users = await this.userService.getAllUser(query)
      return successResponse(res, 200, "Success get user!", users)
    }catch(err) {
      return next(new HttpException(err.status, err.message))
    }
  }

  updateUser = async (req, res, next) => {

  }

  addContact = async (req, res, next) => {
    const { contactId } = req.body
    const { _id } = req.user
    try {
      const update = await this.userService.addContact(contactId, _id)
      return successResponse(res, 200, 'Contact added success!', update)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }
}

export default UserController;
