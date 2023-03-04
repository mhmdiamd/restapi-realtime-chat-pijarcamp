import { dbRepo } from '../../../Config/db.config.js';
import bcrypt from 'bcryptjs';
import HttpException from '../../Exceptions/http.exceptions.js';
import { randomUUID } from 'crypto';

class RecruterAuthModel {
  #DB = dbRepo;

  // Auth Register
  register = async ({ name, email, password, company_name, position, phone }) => {
    const query = `INSERT INTO recruters(id, name, email, company_name, password, position, phone) VALUES('${randomUUID()}', '${name}', '${email}', '${company_name}','${password}', '${position}', '${phone}')`;
    const recruterRegister = await this.#DB.query(query);
    return recruterRegister.rows;
  };

  // Login
  login = async (data) => {
    const queryFindEmail = `SELECT * FROM recruters WHERE email='${data.email}'`;
    const findEmail = await this.#DB.query(queryFindEmail);

    if (findEmail.rowCount == 0) {
      throw new HttpException(401, 'Unauthenticated');
    }

    const isValidPassword = bcrypt.compareSync(data.password, findEmail.rows[0].password);
    if (!isValidPassword) {
      throw new HttpException(401, 'Email or Password is invalid!');
    }
    const { id, name, email, role } = findEmail.rows[0];
    return { id, name, email, role };
  };
}

export default RecruterAuthModel;
