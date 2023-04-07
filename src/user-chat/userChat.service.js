import HttpException from '../Exceptions/http.exceptions.js';
import MessageModel from '../message/message.model.js';
import UserChatModel from './userChat.model.js';

class UserChatService {

  /**UserChatModel
   * Get User chat  
   */

  getUserChat = async (userId) => {
    try {
      const userChats = await this.UserChatModel.find({
        members: {
          $elemMatch: { _id: userId }
        }
      })
      if (!userChats) throw new HttpException(404, 'user Chat not found!')

      return userChats
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
    * Add User Chats
    */

  createUserChat = async (data) => {
    try {

      const newUserChat = new UserChatModel(data)
      const res = await newUserChat.save()
      // Create Message chat user
      const newMessage = new MessageModel({ chatId: res._id })
      await newMessage.save()
      return res
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }


}

export default UserChatService;
