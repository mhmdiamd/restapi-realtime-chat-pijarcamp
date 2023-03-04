// import { clearRedisCache, setOrGetCache } from '../../../Config/redis.config.js';
import HttpException from '../../Exceptions/http.exceptions.js';
import { successResponse } from '../../Helpers/response.js';
import WorkerSkillModel from './workerSkill.model.js';


class WorkerSkillController {
  #workerSkillModel = new WorkerSkillModel();
  #ENDPOINT = 'api/v1/worker-skills';

  getWorkerSkillByIdWorker = async (req, res, next) => {
    const { idWorker } = req.params;
    try {
      const workerSkill = await this.#workerSkillModel.getWorkerSkillByIdWorker(idWorker);
      successResponse(res, 200, `Get worker Skill with ID ${idWorker} success!`, workerSkill);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  
  createWorkerSkill = async (req, res, next) => {
    const {id} = req.user
    const data = {id_worker: id, ...req.body}
    try {
      await this.#workerSkillModel.createWorkerSkill(data);
      successResponse(res, 200, `Create Worker Skill success!`, {message : 'Worker Skill success created!'});
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Get recruter By Id
  getWorkerSkillById = async (req, res, next) => {
    const { id } = req.params;
    try {
      // const recruter = await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return await this.#workerSkillModel.getWorkerSkillById(id);
      // });

      const workerSkill = await this.#workerSkillModel.getWorkerSkillById(id);
      successResponse(res, 200, `Get Worker Skill with ID ${id} success!`, workerSkill);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Delete recruter
  deleteWorkerSkillById = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.#workerSkillModel.deleteWorkerSkillById(id);
      successResponse(res, 200, `Delete Worker Skill with ID ${id} success!`, { message: 'Worker Skill Deleted!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };

  // Update recruter By Id
  updateWorkerSkillById = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.#workerSkillModel.updateWorkerSkillById(id, data);
      // await setOrGetCache(`${this.#ENDPOINT}/${id}`, async () => {
      //   return experience;
      // });
      successResponse(res, 200, `Update Worker Skill with ID ${id} success!`, { message: 'Worker Skill Updated!' });
      // await clearRedisCache(`${this.#ENDPOINT}/${id}`);
    } catch (err) {
      next(new HttpException(err.status, err.message));
    }
  };
}

export default WorkerSkillController;
