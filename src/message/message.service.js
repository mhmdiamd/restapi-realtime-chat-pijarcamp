import HttpException from '../Exceptions/http.exceptions.js';
import GroupModel from '../group/group.model.js';
import userChatModel from '../user-chat/userChat.model.js';
import messageModel from './message.model.js';

class MessageService {

  /**
   * Get Message by Chat ID
   */

  getMessageByChatId = async (id) => {
    try {
      const messages = await messageModel.findOne({ chatId: id })
      if (!messages) throw new HttpException(404, `Message not found!`)
      return messages
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
   * Create Message
   */

  sendMessage = async (id, message) => {
    try {
      const res = await messageModel.findOneAndUpdate(
        { chatId: id },
        { $push: { messages: message } },
        { new: true }
      )

      if (res) {
        await userChatModel.findOneAndUpdate(
          { _id: id },
          {
            lastMessage: {
              text: message.text
            }
          },
          { new: true }
        )
      }

      return res
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
  * Send Message Group
  */

  sendMessageGroup = async (id, message) => {
    try {
      const res = await messageModel.findOneAndUpdate(
        { chatId: id },
        { $push: { messages: message } },
        { new: true }
      )

      if (res) {
        await GroupModel.findOneAndUpdate(
          { _id: id },
          {
            lastMessage: {
              text: message.text
            }
          },
          { new: true }
        )
      }

      return res
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
   * Delete Message
   */

  deleteMessageById = async (idMessage, idRoom) => {
    try {
      const findRoom = await messageModel.updateOne(
        {
          chatId: idRoom,
          messages: {
            $elemMatch: { _id: idMessage }
          }
        },
        { $set: { "messages.$.is_deleted": true } },
        { new: true }
      )

      return findRoom
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
   * Update Message
   */

  updateMessageById = async ({idMessage, idRoom, text}) => {
    try {
      const editMessage = await messageModel.updateOne(
        {
          chatId: idRoom,
          messages: {
            $elemMatch: { _id: idMessage }
          }
        },
        { $set: { "messages.$.text": text } },
        { new: true }
      )

      return editMessage
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }



}

export default MessageService;
