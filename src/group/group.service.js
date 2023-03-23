import HttpException from '../Exceptions/http.exceptions.js';
import MessageModel from '../message/message.model.js';
import GroupModel from './group.model.js';


class GroupService {
  groupModel = GroupModel

  /**
   * Get Group chat
   */

  getGroupChat = async (userId) => {
    try {
      const groupChats = await this.groupModel.find({
        members: {
          $elemMatch: { _id: userId }
        }
      })
      if (!groupChats) throw new HttpException(404, 'Group Chat not found!')

      return groupChats
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }


  /**
   * Create Group Chat
   */

  async createGroupChat(data) {
    const { user, name, roomMasterId, members } = data
    const regenerateMembers = members && members?.map(member => {
      return {
        ...member,
        status: "member"
      }
    })
    const groupMember = !regenerateMembers ? [
      {...user, status: "admin"}
    ] : [
      {...user, status: "admin"},
      ...regenerateMembers
    ] 

    const newGroupChat = new GroupModel({
      name,
      roomMasterId,
      members: groupMember
    })
    try {

      const resCreate = await newGroupChat.save()

      // Create Message chat Group
      const newMessage = new MessageModel({ chatId: resCreate._id })
      await newMessage.save()

      return resCreate
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }


  /**
  * Add Member
  */

  async addMemberGroup(data) {
    try {
      const resAaddMember = await this.groupModel.findOneAndUpdate(
        { _id: data.id },
        { $push: { members: data } },
        { new: true }
      )

      return resAaddMember
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

}

export default GroupService;
