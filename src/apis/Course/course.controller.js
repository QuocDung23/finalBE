import CourseService from "./course.service.js";

class CourseController {
  async createCourse(req, res) {
    try {
      if (!req.user || !req.user.id) {
        throw new Error("không có thông tin người này từ token");
      }
      await CourseService.restrictTo("admin")(req.user);
      const { title, description, price, createBy } = req.body;
      if ((!title, description, price, createBy)) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin",
        });
      }
      const courseData = {
        title,
        description,
        price,
        createBy: {
          id: req.user.id,
          name: req.user.name,
        },
      };
      const createCourse = await CourseService.createCourse(courseData);
      return res.status(200).json({
        success: true,
        message: "Tạo thành công",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getCourse(req, res) {
    try {
      const { title, description, price, createBy } = req.body;
      const getCourse = await CourseService.getCourse({
        title,
        description,
        price,
        createBy,
      });
      return res.status(200).json({
        success: true,
        data: getCourse,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getCourseById(req, res){
    try{
        const { id } = req.body
        const getCourseById = await CourseService.getCourseById(id)
        return res.status(200).json({
            success: true,
            data: getCourseById
        })
    }catch(error){
        console.log(error);
        return res.status(400).json({
          success: false,
          message: error.message,
        });
    }
  }
}

export default new CourseController();
