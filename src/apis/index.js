import express from 'express';
import authRoute  from './auth/auth.router.js';
import courseRoute from './Course/course.router.js';

const router = express.Router();

router.use('/auth' ,authRoute);
router.use('/course', courseRoute)


export default router;