import HttpException from '../Exceptions/http.exceptions.js';
import userChatModel from '../UserChat/UserChat.model.js';
import messageModel from './message.model.js';

class MessageService {

  /**
   * Get Message by Chat ID
   */

  getMessageByChatId = async (id) => {
    try{
      const messages = await messageModel.findOne({chatId: id})
      if(!messages) throw new HttpException(404, `Message not found!`)
      return messages
    }catch(err){
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

      if(res) {
        await userChatModel.findOneAndUpdate(
          {_id: id},
          {lastMessage : {
            text: message.text
          }},
          {new: true}
        )
      }
      
      return res
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }
}

export default MessageService;
