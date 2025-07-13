import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const courseSchema = new mongoose.Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:Number, required:true},
    createBy: {type:ObjectId, ref: 'User', required: true}
}, { timestamps: true })

const courseModel = mongoose.model('Course', courseSchema)

export default courseModel