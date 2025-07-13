import express from "express";
import courseController from "./course.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const courseRoute = express.Router();

courseRoute.post('/createCourse', authenticateToken, courseController.createCourse)
courseRoute.get('/getCourse', courseController.getCourse)
courseRoute.get('/getCourse/:id', courseController.getCourseById)

export default courseRoute;

