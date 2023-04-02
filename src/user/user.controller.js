import { auth, createAndUpload } from "../../Config/googleDrive.config.js"
import HttpException from "../Exceptions/http.exceptions.js"
import { successResponse } from "../Helpers/response.js"
import UserService from "./user.service.js"


class UserController {
  userService = new UserService()

  getAllUser = async (req, res, next) => {
    const query = req.query
    try {
      const users = await this.userService.getAllUser(query)
      return successResponse(res, 200, "Success get user!", users)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }

  updateUser = async (req, res, next) => {
    const photo = req.file
    const { id } = req.params
    let photoLink = undefined

    try {

      let data ={
        ...req.body
      }

      if (photo) {
        const { id : photoId} = await createAndUpload(auth, photo)
        photoLink = `https://drive.google.com/uc?id=${photoId}`
      }

      if(photoLink) {
        data = {
          ...req.body,
          photo: photoLink
        }
      }

      const update = await this.userService.udpateUser(id, data)
      console.log(update)
      return successResponse(res, 200, "Update User success", update)

    } catch (err) {
      console.log(err)
      return next(new HttpException(err.status, err.message))
    }
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
