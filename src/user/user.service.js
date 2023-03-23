import HttpException from '../Exceptions/http.exceptions.js';
import userModel from './user.model.js';
import { randomUUID } from 'crypto'

class UserService {
  #userModel = userModel

  /**
   * Get All user
   */

  async getAllUser(search) {
    const { name } = search
    const nameReg = new RegExp(`.*${name}.*`)
    try {
      const users = await this.#userModel.find({
        name: {
          $regex: nameReg,
          $options: "i"
        }
      }, {
        password: false
      }).limit(5)

      if (!users) {
        throw new HttpException(404, `User not found!`)
      }

      return users
    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }

  /**
   * Add Contact
  **/

  async addContact(contactId, userId) {
    try {
      // Get data Contact 
      const getDataContact = await this.#userModel.findOne({ _id: contactId })
      const dataContact = {
        contactId,
        name: getDataContact.name,
        email: getDataContact.email,
        photo: getDataContact.photo,
      }

      const updateUser = await this.#userModel.findOneAndUpdate(
        { _id: userId },
        { $push: { contacts: dataContact } },
        { new: true }
      )

      if (!updateUser) {
        throw new HttpException(404, `User not Found!`)
      }

      return updateUser

    } catch (err) {
      throw new HttpException(err.status, err.message)
    }
  }
}

export default UserService;