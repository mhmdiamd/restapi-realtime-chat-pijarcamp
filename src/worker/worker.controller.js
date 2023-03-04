// import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import HttpException from '../Exceptions/http.exceptions.js';
import { successResponse } from '../Helpers/response.js';
import WorkerModel from './worker.model.js';
import { updatePhoto, auth, createAndUpload } from '../../Config/googleDrive.config.js';


class WorkerController {
  #workerModel = new WorkerModel();
  // ENDPOINT = '/workers';

  // Get all Worker
  getAllWorker = async (req, res, next) => {
    const query = req.query
    try {
      const workers = await this.#workerModel.getAllWorker(query);
      const {data, ...other} = workers
      res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Success get all worker!",
          data,
          ...other
      })
      successResponse(res, 200, 'Get all Worker success!', ...workers);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get Worker By Id
  getWorkerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const worker = await setOrGetCache(`${this.ENDPOINT}/${id}`, async () => {
      //   return await this.#workerModel.getWorkerById(id);
      // });

      const worker = await this.#workerModel.getWorkerById(id);
      successResponse(res, 200, `Get Worker with ID ${id} success!`, worker);
    } catch (err) {
      console.log(err);
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete Worker
  deleteWorkerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#workerModel.deleteWorkerById(id);
      successResponse(res, 200, 'Worker success deleted!', { mesage: 'Worker deleted!' });
      // await clearRedisCache(`${this.ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update Worker By Id
  updateWorkerById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // Create file name
      if(req.file) {
        // Get Worker by id
        const worker = await this.#workerModel.getWorkerById(id)

        // Check if user have a photo before
        if(worker.photo == 'photodefault.jpg') {
          const uploadToDrive = await createAndUpload(auth, req.file)
          // Generate photo Url
          const photoLink = `https://drive.google.com/uc?id=${uploadToDrive.id}`
          await this.#workerModel.updateWorkerById(id, {...req.body, photo : photoLink});
        }else {
          // Get Id photo
          const getPhotoId = worker.photo.split('=')[1]
          // Update Photo in drive
          await updatePhoto(auth, req.file, getPhotoId)
          await this.#workerModel.updateWorkerById(id, {...req.body});
        }
      }else {
         await this.#workerModel.updateWorkerById(id, req.body);
      }

      // await clearRedisCache(`${this.ENDPOINT}/${id}`);
      // await setOrGetCache(`${this.ENDPOINT}/${id}`, async () => {
      //   return worker;
      // });
      successResponse(res, 200, `Success updated worker with id ${id}`, { message: `worker Updated!` });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default WorkerController;
