import HttpException from '../Exceptions/http.exceptions.js';
import userModel from './user.model.js';
import { randomUUID } from 'crypto'

class UserService {
  #userModel = userModel

  /**
   * Add Contact
  **/

  async addContact(contactId, userId) {
    try {
      // Get data Contact 
      const getDataContact = await this.#userModel.findOne({_id: contactId})
      const dataContact = {
        _id: randomUUID(),
        contactId,
        name: getDataContact.name,
        photo: getDataContact.photo,
        phone: getDataContact.phone,
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
