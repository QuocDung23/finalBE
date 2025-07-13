import { CourseRepo } from "../../repositories/course.repo.js";
import dotenv from 'dotenv';


const courseRepo = new CourseRepo();

class CourseService {
    constructor() {
        dotenv.config();
    }

    async createCourse(dto) {
        const createCourse = await courseRepo.createCourse(dto) 
        return createCourse
    }

    async getCourse(){
        const getCourse = await courseRepo.getCourse()
        return getCourse
    }

    restrictTo(...roles) {
        return async (user) => {
          if (!roles.includes(user.role)) {
            throw new Error('Bạn không có quyền thực hiện hành động này');
          }
          return true;
        };
      }
}

export default new CourseService();
