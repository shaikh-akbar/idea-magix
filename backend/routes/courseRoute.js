// routes/courseRoute.js
const express = require('express');
const router = express.Router();
const { createCourse, updateCourse, deleteCourse } = require('../controller/courseController');
const { isAdmin, authenticateUser } = require('../middleware/authMiddleware');

router.post('/create-course',authenticateUser, isAdmin, createCourse);

router.put('/update-course/:courseId', authenticateUser,isAdmin,updateCourse);

router.delete('/delete-course/:courseId',authenticateUser,isAdmin,deleteCourse )

module.exports = router;
