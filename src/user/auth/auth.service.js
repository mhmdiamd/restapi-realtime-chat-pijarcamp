import userModel from '../user.model.js';
import { generateRefreshToken, generateToken } from '../../Helpers/token.js';

class UserService {
   #user = userModel;

  /**
   * Register a new user
   */

  async register(
    name,
    email,
    passwordLogin,
    role
  ) {
    try {
      const newUser = await this.#user.create({
        name,
        email,
        passwordLogin,
        role,
      });

      const { password, ...other } = newUser;

      return other;
    } catch (err) {
      throw new Error('Unable to register!');
    }
  }

  /**
   * Attempt user login
   */

  login = async (email, password) => {
    try {
      const user = await this.#user.findOne({ email });

      if (!user)
        throw new Error('Unable to find user with that Email Address');

      if (await user.isValidPassword(password)) {
        const {password, ...data} = user._doc
        const token = generateToken(data)
        const refreshToken = generateRefreshToken(data)
        return {...data, token, refreshToken}
      } else {
        throw new Error('Wrong credentials given');
      }
    } catch (err) {
      console.log(err)
      throw new Error('Unable to login user ');
    }
  };
}

export default UserService;
