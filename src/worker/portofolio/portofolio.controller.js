import { auth, createAndUpload, deletePhoto, updatePhoto } from '../../../Config/googleDrive.config.js';
// import { clearRedisCache, setOrGetCache } from '../../../Config/redis.config.js';
import HttpException from '../../Exceptions/http.exceptions.js';
import { successResponse } from '../../Helpers/response.js';
import PortofolioModel from './portofolio.model.js';


class PortofolioController {
  #portofolioModel = new PortofolioModel();
  #ENDPOINT = 'api/v1/portofolios';


  getPortofolioByIdWorker = async (req, res, next) => {
    const { idWorker } = req.params;
    try {
      const portofolios = await this.#portofolioModel.getPortofolioByIdWorker(idWorker);
      successResponse(res, 200, `Get portofolios with ID ${idWorker} success!`, portofolios);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  
  createPortofolio = async (req, res, next) => {
    const {id} = req.user
    const data = req.body
    try {
      // Upload To Drive
      const uploadToDrive = await createAndUpload(auth, req.file)
      // Generate photo Url
      const photoLink = `https://drive.google.com/uc?id=${uploadToDrive.id}`
      // Create data to DB
      await this.#portofolioModel.createPortofolio({id_worker : id, photo: photoLink, ...data});
      // Send Response Success
      successResponse(res, 200, `Create portofolio success!`, {message : 'Portofolio success created!'});
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get recruter By Id
  getPortofolioById = async (req, res, next) => {
    const { id } = req.params;
    try {

      const recruter = await this.#portofolioModel.getPortofolioById(id);
      successResponse(res, 200, `Get Portofolio with ID ${id} success!`, recruter);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete recruter
  deletePortofolioById = async (req, res, next) => {
    const { id } = req.params;
    try {

      // const getPhotId = await portofolioBeforeDelete.data.photo.split("=")[1]
      // // const deletePhotoFromDrive = await deletePhoto(auth, getPhotId)

      await this.#portofolioModel.deletePortofolioById(id);
      successResponse(res, 200, `Delete Portofolio with ID ${id} success!`, { message: 'Portofolio Deleted!' });

      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update recruter By Id
  updatePortofolioById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {

      if(req.file) {
        // Get portoflio by id
        const portofolio = await this.#portofolioModel.getPortofolioById(id)
        // Get Id photo
        const getPhotoId = portofolio.photo.split('=')[1]
        // Update Photo in drive
        await updatePhoto(auth, req.file, getPhotoId)
      }

      await this.#portofolioModel.updatePortofolioById(id, data);
      // await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return recruter;
      // });
      successResponse(res, 200, `Update Recruter with ID ${id} success!`, { message: 'Recruter Updated!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default PortofolioController;
