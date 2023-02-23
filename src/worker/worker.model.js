import { dbRepo } from '../../Config/db.config.js';
import HttpException from '../Exceptions/http.exceptions.js';

class WorkerModel {
  #DB = dbRepo;

  // Get All workers Service
  getAllSeller = async () => {
    let query = 'SELECT id, name, email,phone, job_desk,address,description FROM workers';
    const workers = await this.#DB.query(query);

    // Error if workers id not found!
    if (workers.rowCount == 0) {
      throw new HttpException(404, `Seller not found!`);
    }

    return workers.rows;
  };

  // Get single User
  getSellerById = async (id) => {
    const query = `SELECT * FROM workers WHERE id = '${id}'`;

    const worker = await this.#DB.query(query);
    if (worker.rowCount == 0) {
      throw new HttpException(404, `Worker with ID ${id} is not found!`);
    }

    const { password, ...other } = worker.rows[0]
    return { ...other }
  };

  // Delete User
  deleteSellerById = async (id) => {
    await this.getSellerById(id);
    const query = `DELETE FROM workers WHERE id = '${id}'`;
    const deletedUsers = await this.#DB.query(query);

    return deletedUsers.rows;
  };

  // Update workers by Id
  updateSellerById = async (id, data) => {
    await this.getSellerById(id);

    const { name, description, phone, address, photo, store_name } = data;
    const query = `UPDATE workers SET name='${name}', phone='${phone}',  description=${description ? `'${description}'` : ''}, address='${address}',store_name='${store_name}', photo='${photo}' WHERE id = '${id}'`;
    const updatedUser = await this.#DB.query(query);
    console.log(updatedUser);

    return await this.getSellerById(id);
  };
}

export default WorkerModel;
