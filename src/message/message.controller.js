import HttpException from "../Exceptions/http.exceptions.js"
import { successResponse } from "../Helpers/response.js"
import MessageService from "./message.service.js"

class MessageController {
  messageService = new MessageService()

  /**
   * Get Message By Chat Id
   */

  getMessageByChatId = async (req, res, next) => {
    const { id } = req.params
    try {
      const messages = await this.messageService.getMessageByChatId(id)
      return successResponse(res, 200, "Success get data messages", messages)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }

  /**
   * Create message
   */

  sendMessage = async (req, res, next) => {
    const { message } = req.body
    const { id } = req.params
    const newMessage = { ...message, senderId: req.user._id }
    try {
      const message = await this.messageService.sendMessage(id, newMessage)
      return successResponse(res, 200, "Message Success to send!", message)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }


   /**
   * Send Message Group
   */

   sendMessageGroup = async (req, res, next) => {
    const { message } = req.body
    const { id } = req.params
    const newMessage = { ...message, senderId: req.user._id }
    try {
      const message = await this.messageService.sendMessage(id, newMessage)
      return successResponse(res, 200, "Message Success to send!", message)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }

}

export default MessageController;
