import { get } from "mongoose";
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
            console.error('Lỗi lấy course', error.message)
        }
    }

    async getCourseById(id){
        try{
            const getById = await courseModel.findById(id)
            return {
                title: getById.title,
                description: getById.description,
                price: getById.price,
                create: {
                    id: getById.user.id,
                    name: getById.user.name
                }
            }
        }catch(error){
            console.error('lỗi lấy course từ id', error.message)
        }
    }

    async updateCourse(id, update) {
        try {
            const updateCourse = await courseModel.findOneAndUpdate({ id: id }, update, {new: true}).lean()
            return updateCourse
        }catch(error) {
            console.error( 'lỗi update course',error.message)
        }
    }
}