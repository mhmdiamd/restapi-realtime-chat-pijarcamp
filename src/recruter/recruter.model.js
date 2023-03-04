import HttpException from '../Exceptions/http.exceptions.js';
import { PrismaClient } from '@prisma/client';
import { dbRepo } from './../../Config/db.config.js';

class RecruterModel {
  #DB = dbRepo
  prisma = new PrismaClient()

  // Count Product
  #coutRecruter = async (search) => {
    return await this.prisma.recruters
      .aggregate({
        _count: {
          id: true,
        },
        where: {
          name: {
            contains: search || '',
          },
        },
      })
      .then((res) => res._count.id);
  };

  exclude(recruters, key) {
    for (let recruter of recruters) {
      delete recruter[key]
    }
    return recruters
  }

  // Get All recruters Service
  getAllRecruter = async ({ search, sortBy, sort, page, limit }) => {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const offset = (page - 1) * limit;
    let recruters = await this.prisma.recruters.findMany({
      where: {
        name: {
          // Filtering data with search
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy: [
        // Ordering and sorting data recruters
        {
          [sortBy || 'id']: sort || 'desc',
        },
      ],
      take: Number(limit), // Limit
      skip: offset, // Offser
    });

    // Error Handling when product is not found!
    if (recruters.length == 0) {
      throw new HttpException(404, 'recruter not found!');
    }

    recruters = this.exclude(recruters, 'password')

    let totalData;

    if (search) {
      totalData = await this.#coutRecruter(search);
    } else {
      totalData = await this.#coutRecruter();
    }

    // Get Total Page
    const totalPage = Math.ceil(totalData / limit);
    return {
      data: recruters,
      currentPage: page,
      totalPage,
      count: totalData,
      limit,
    };
  };

  // Get single User
  getRecruterById = async (id) => {
    let recruter = await this.prisma.recruters.findUnique({
      where: {
        id: id
      }
    });

    const { password, ...other } = recruter

    return { ...other };
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
    const recruter = await this.prisma.recruters.update({
      data: data,
      where : {
        id: id
      }
    })

    return recruter
  };
}

export default RecruterModel;
