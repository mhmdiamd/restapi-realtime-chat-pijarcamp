import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import HttpException from '../Exceptions/http.exceptions.js';
import { successResponse } from '../Helpers/response.js';
import RecruterModel from './recruter.model.js';

class RecruterController {
  #recruterModel = new RecruterModel();
  #ENDPOINT = 'api/v1/recruters';

  // Get all recruter
  getAllRecruter = async (req, res, next) => {
    try {
      const recruters = await this.#recruterModel.getAllRecruter();
      successResponse(res, 200, 'Get all recruter success!', recruters);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get recruter By Id
  getRecruterById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const recruter = await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return await this.#recruterModel.getRecruterById(id);
      // });

      const recruter = await this.#recruterModel.getRecruterById(id);
      successResponse(res, 200, `Get recruter with ID ${id} success!`, recruter);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete recruter
  deleteRecruterById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#recruterModel.deleteRecruterById(id);
      successResponse(res, 200, `Delete recruter with ID ${id} success!`, { message: 'recruter Deleted!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update recruter By Id
  updateRecruterById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const recruter = await this.#recruterModel.updateRecruterById(id, data);
      await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
        return recruter;
      });
      successResponse(res, 200, `Update Recruter with ID ${id} success!`, { message: 'Recruter Updated!' });
      await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default RecruterController;
