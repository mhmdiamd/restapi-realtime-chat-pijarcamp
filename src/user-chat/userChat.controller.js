import HttpException from "../Exceptions/http.exceptions.js"
import { successResponse } from "../Helpers/response.js"
import userModel from "../user/user.model.js"
import UserService from "../user/user.service.js"
import UserChatService from './userChat.service.js'

class UserChatController {
  #userChatService = new UserChatService()
  #userService = new UserService()

  /**
   * Get user chat
   */
  getUserChat = async (req, res, next) => {
    const { _id } = req.user

    try {
      const userChats = await this.#userChatService.getUserChat(_id)
      return successResponse(res, 200, 'Success get user chat', userChats)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }


  createUserChat = async (req, res, next) => {
    const { contactId } = req.body
    const { _id, name, photo } = req.user
    try {

      // Get data Contact
      const findContact = await userModel.findById(contactId)
      if (!findContact) return next(HttpException(404, `Contact not found!`))
      const data = {
        members: [
          { _id, name, photo
          },{
            _id: findContact._id.toString(),
            name: findContact.name,
            photo: findContact.photo
          }
        ],
        lastMessage: {
          text: ""
        }
      }
      const resData = await this.#userChatService.createUserChat(data)
      if(resData) {
        // Update contact
        await this.#userService.addContact(contactId, _id)
      }
      successResponse(res, 200, 'Success create user chat', resData)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }
}

export default UserChatController;
