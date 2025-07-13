import express from "express";
import courseController from "./course.controller.js";
import authenticateToken from "../../middlewares/authenticateToken.js";

const courseRoute = express.Router();

courseRoute.post('/createCourse', authenticateToken, courseController.createCourse)

export default courseRoute;

