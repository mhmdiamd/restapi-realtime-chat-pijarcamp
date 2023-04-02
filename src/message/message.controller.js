import HttpException from "../Exceptions/http.exceptions.js"
import { successResponse } from "../Helpers/response.js"
import MessageService from "./message.service.js"
import { randomUUID } from 'crypto'


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
    const newMessage = { ...message, senderId: req.user._id, _id: randomUUID(), is_deleted: false }
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

  /**
   * Delete Message
   */

  deleteMessageById = async (req, res, next) => {
    const { id_message } = req.body
    const { id: id_room } = req.params
    console.log(req.body)
    try {
      await this.messageService.deleteMessageById(id_message, id_room)
      return successResponse(res, 200, "Message Success deleted!", {})
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }

  
  /**
   * Update Message By Id
   */

  updateMessageById = async (req, res, next) => {
    const { id_message, text } = req.body
    const { id: id_room } = req.params
    const data = {
      idMessage: id_message,
      idRoom: id_room,
      text
    }
    try {
      const newMessage = await this.messageService.updateMessageById(data)
      return successResponse(res, 200, "Message Success updated!", newMessage)
    } catch (err) {
      return next(new HttpException(err.status, err.message))
    }
  }


}

export default MessageController;
