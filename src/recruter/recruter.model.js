import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../Exceptions/http.exceptions.js';

class RecruterModel {
  #DB = dbRepo;

  // Get All Recruter Service
  getAllRecruter = async () => {
    let query = 'SELECT id, name, phone, email, address, gender, birth_date, role, photo FROM recruters';
    const recruters = await this.#DB.query(query);

    // Error if recruters id not found!
    if (recruters.rowCount == 0) {
      throw new HttpException(404, `recruters not found!`);
    }

    return recruters.rows;
  };

  // Get single User
  getRecruterById = async (id) => {
    const query = `SELECT id, name, email,phone, address, birth_date, gender, photo FROM recruters WHERE id = '${id}'`;

    const recruter = await this.#DB.query(query);
    if (recruter.rowCount == 0) {
      throw new HttpException(404, `Buyer with ID ${id} is not found!`);
    }

    return recruter.rows[0];
  };

  // Delete User
  deleteRecruterById = async (id) => {
    await this.getRecruterById(id);
    const query = `DELETE FROM recruters WHERE id = '${id}'`;
    const deletedRecruter = await this.#DB.query(query);

    return deletedRecruter.rows;
  };

  // Update Recruter by Id
  updateRecruterById = async (id, data) => {
    await this.getRecruterById(id);

    const { name, gender, phone, birth_date, address, photo } = data;
    const query = `UPDATE recruters SET 
    name='${name}', 
    phone=${phone ? `'${phone}'` : null}, 
    birth_date=${`${birth_date}` || null}, 
    gender=${`'${gender}'` || null}, 
    address=${address ? address : null}, 
    photo='${photo}'
    WHERE id = '${id}'`;
    const updatedRecruter = await this.#DB.query(query);

    return await this.getRecruterById(id);
  };
}

export default RecruterModel;
