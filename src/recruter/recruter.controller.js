// import { clearRedisCache, setOrGetCache } from '../../Config/redis.config.js';
import { auth, createAndUpload, updatePhoto } from '../../Config/googleDrive.config.js';
import HttpException from '../Exceptions/http.exceptions.js';
import { successResponse } from '../Helpers/response.js';
import RecruterModel from './recruter.model.js';

class RecruterController {
  #recruterModel = new RecruterModel();
  // #ENDPOINT = 'api/v1/recruters';

  // Get all recruter
  getAllRecruter = async (req, res, next) => {
    const query = req.params
    try {
      const recruters = await this.#recruterModel.getAllRecruter(query);
      const {data, ...other} = recruters
      res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Get All Recruter success!",
          data,
          ...other
      })
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
    try {
      //   Create file name
      if(req.files['photo'] || req.files['background_photo']) {

        // Get Recruter by id
        const recruter = await this.#recruterModel.getRecruterById(id)
        let photoLink = recruter.photo
        let backgroundPhotoLink = recruter.background_photo

        // Check if user have a photo before
        if(photoLink == 'photodefault.jpg' || backgroundPhotoLink == 'photodefault.jpg') {

          // Check Recruter have photo before
          if(photoLink == 'photodefault.jpg' && req.files['photo']){
            const uploadToDrive = await createAndUpload(auth, req.files['photo'][0])
            // Generate photo Url
            photoLink = `https://drive.google.com/uc?id=${uploadToDrive.id}`
          }

          // Check Recruter have background or no before
          if(backgroundPhotoLink == 'photodefault.jpg' && req.files['background_photo']){
            const uploadToDrive = await createAndUpload(auth, req.files['background_photo'][0])
            // Generate photo Url
            backgroundPhotoLink = `https://drive.google.com/uc?id=${uploadToDrive.id}`
          }

          await this.#recruterModel.updateRecruterById(id, {...req.body, photo: photoLink, background_photo: backgroundPhotoLink});

        }else {
          // Check Recruter have photo before
          if(photoLink != 'photodefault.jpg' ){
            // Get Id photo
            const getPhotoId = photoLink.split('=')[1]
            // Update Photo in drive
            await updatePhoto(auth, req.files['photo'][0], getPhotoId)
          }

          if(backgroundPhotoLink != 'photodefault.jpg'){
            // Get Id photo
            const getPhotoId = backgroundPhotoLink.split('=')[1]
            // Update Photo in drive
            await updatePhoto(auth, req.files['background_photo'][0], getPhotoId)
          }

          await this.#recruterModel.updateRecruterById(id, {...req.body});
        }
      }else {
         await this.#recruterModel.updateRecruterById(id, req.body);
      }

      // await clearRedisCache(`${this.ENDPOINT}/${id}`);
      // await setOrGetCache(`${this.ENDPOINT}/${id}`, async () => {
      //   return recruter;
      // });
      successResponse(res, 200, `Success updated recruter with id ${id}`, { message: `recruter Updated!` });
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
    
  }
}

export default RecruterController;
