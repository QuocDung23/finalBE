import courseModel from "../models/courses.model.js";
import UserModel from "../models/users.model.js";

export class CourseRepo {
    async createCourse(dto) {
        try{
            const {title, description, price, createBy} = dto;
            const checkUser = await UserModel.findById(createBy).lean()
            if(!checkUser)
            {throw new Error("Người Dùng Không tồn tại")}
            const createCourse = await courseModel.create({
                title,
                description,
                price,
                createBy
            })
            const result = await courseModel.findById(createCourse.id).populate("create", "id name").lean()

            return result
        }catch(error){
            console.error("Không thể tạo course", error.message)
        }
    }

    async getCourse() {
        try{
            const findCourse = await courseModel.find()
            return {
                title: findCourse.title,
                description: findCourse.description,
                price: findCourse.price,
                createBy: {
                    id: findCourse.user.id,
                    name: findCourse.user.name
                }
            }
        }catch(error) {
            console.error(error.message)
        }
    }
}