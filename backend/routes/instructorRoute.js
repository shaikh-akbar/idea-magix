
const express = require('express');
const { createInstructor, getAllInstructors, assignLectureToInstructor, getAssignedLecturesToInstructor } = require('../controller/InstructureCtrl');
const {isAdmin,authenticateUser, authenticateInstructor} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-instructor',createInstructor)
router.post('/assign-lecture/:instructorId', authenticateUser,isAdmin,assignLectureToInstructor);
router.get('/assign-lectures-to-instructor',authenticateUser,getAssignedLecturesToInstructor);
router.get('/get-all-instructor',authenticateUser,isAdmin,getAllInstructors)

module.exports = router;
