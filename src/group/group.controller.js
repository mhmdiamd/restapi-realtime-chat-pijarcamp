import HttpException from "../Exceptions/http.exceptions.js"
import { successResponse } from "../Helpers/response.js"
import GroupService from "./group.service.js";

class GroupController {
  #groupService = new GroupService()

  /**
   * Get Group chat
   */


  /**
   * Creat new Group Chat
   */
  createGroupChat = async (req, res, next) => {
    const {_id, name: userName, photo} = req.user
    const { name } = req.body
    const members = req.body.members

    try{
      const createGroup = await this.#groupService.createGroupChat({
        name,
        roomMasterId: _id,
        user: {
          _id,
          name: userName,
          photo
        },
        members: members ? members : undefined
      })
      return successResponse(res, 200, "Success create group", createGroup)

    }catch(err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
   * Create Your Group Chat
   */

  getGroupChat = async (req, res,next) => {
    const {_id} = req.user
    try{
      const data = await this.#groupService.getGroupChat(_id)
      return successResponse(res,200, "Success Get Group Chat", data)
    }catch(err){
      return next(new HttpException(err.status, err.nessage))
    }
  }

   /**
   * Add Group Member
   */

   addGroupMember = async (req, res, next) => {
    const {id} = req.params
    const data = {
      ...req.body,
      id,
      status: "member"
    }
    try{
      const resAddMember = await this.#groupService.addMemberGroup(data)
      return successResponse(res, 200, "Success add member", resAddMember)
    }catch(err){
      return next(new HttpException(err.status, err.nessage))

    }
   }


 
}

export default GroupController;
