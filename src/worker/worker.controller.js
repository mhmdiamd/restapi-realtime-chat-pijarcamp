import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import HttpException from '../Exceptions/http.exceptions.js';
import { successResponse } from '../Helpers/response.js';
import WorkerModel from './worker.model.js';
import SellerModel from './worker.model.js';


class WorkerController {
  #workerModel = new WorkerModel();
  ENDPOINT = '/workers';

  // Get all Seller
  getAllSeller = async (req, res, next) => {
    try {
      const sellers = await this.#workerModel.getAllSeller();

      successResponse(res, 200, 'Get all Sellers success!', sellers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Seller By Id
  getSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const seller = await setOrGetCache(`${this.ENDPOINT}/${id}`, async () => {
      //   return await this.#workerModel.getSellerById(id);
      // });

      const seller = await this.#workerModel.getSellerById(id);
      successResponse(res, 200, `Get seller with ID ${id} success!`, seller);
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Seller
  deleteSellerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#workerModel.deleteSellerById(id);
      successResponse(res, 200, 'Seller success deleted!', { mesage: 'Seller deleted!' });
      await clearRedisCache(`${this.ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Seller By Id
  updateSellerById = async (req, res, next) => {
    const { id } = req.params;
    const photo = req.file;
    try {
      // Create file name
      const photoUrl = `${process.env.HOST}${process.env.SELLER_PROFILE_UPLOAD_DIR}${photo.filename}`;
      const data = { ...req.body, photo: photoUrl };
      // await clearRedisCache(`${this.ENDPOINT}/${id}`);
      const seller = await this.#workerModel.updateSellerById(id, data);
      // await setOrGetCache(`${this.ENDPOINT}/${id}`, async () => {
      //   return seller;
      // });
      successResponse(res, 200, `Success updated seller with id ${id}`, { message: `Seller Updated!` });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default WorkerController;
