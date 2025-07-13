import { CourseRepo } from "../../repositories/course.repo.js";
import dotenv from "dotenv";

const courseRepo = new CourseRepo();

class CourseService {
  constructor() {
    dotenv.config();
  }

  async createCourse(dto) {
    const createCourse = await courseRepo.createCourse(dto);
    return createCourse;
  }

  async getCourse() {
    const getCourse = await courseRepo.getCourse();
    return getCourse;
  }

  async getCourseById(id) {
    const getCourseById = await courseRepo.getCourseById(id);
    return getCourseById;
  }

  async updateCourse(id, update) {
    const CourseId = await courseRepo.getCourseById(id);
    if (!updateCourse) {
      throw new error("Không tìm thấy course");
    }

    const validRole = "admin";
    if (update.role && !validRole.includes(update.role)) {
      throw new Error("Bạn không có quyền thay đổi Task");
    }
    const courseÌno = {
      title: update.title || CourseId.title,
      description: update.description || CourseId.description,
      price: update.price || CourseId.price,
    };
    const updateData = await courseRepo.updateCourse(id, { $set: courseÌno });
    if (!updateData) {
      throw new Error("Cập nhật thất bại");
    }
    return {
      title: updateData.title,
      description: updateData.description,
      price: updateData.price
    };
  }

  restrictTo(...roles) {
    return async (user) => {
      if (!roles.includes(user.role)) {
        throw new Error("Bạn không có quyền thực hiện hành động này");
      }
      return true;
    };
  }
}

export default new CourseService();
