const Instructor = require("../models/Instructor");
const jwt = require('jsonwebtoken');


const createInstructor = async (req, res) => {
    const { name, email, qualifications } = req.body;

    try {
        const existingInstructor = await Instructor.findOne({ $or: [{ name }, { email }] });
        if (existingInstructor) {
            return res.status(400).json({ error: 'Instructor already exists' });
        }

        const instructor = new Instructor({ name, email, qualifications });
        await instructor.save();

        res.status(201).json({ message: 'Instructor added successfully', instructor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const assignLectureToInstructor = async (req, res) => {
    const { instructorId } = req.params;
    const { date, courseId } = req.body;

    try {
        let instructor = await Instructor.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }

        const existingLecture = instructor.lectures.find(lecture => lecture.date === date);
        if (existingLecture) {
            return res.status(400).json({ error: 'Instructor is already assigned to a lecture on the same date' });
        }

        instructor.lectures.push({ date, courseId });
        await instructor.save();

        res.json({ message: 'Lecture assigned successfully', instructor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAssignedLecturesToInstructor = async (req, res) => {
    try {
        console.log('Authenticated User:', req.user);
        
        const instructorId = req.user._id;
        console.log('Instructor ID:', instructorId);
        
        const instructor = await Instructor.findById(instructorId).populate('lectures.courseId');
        console.log('Instructor:', instructor);

        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }

        res.json({ lectures: instructor.lectures });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllInstructors = async (req, res) => {
    try {
        const bearerToken = req.headers.authorization;
        
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access: Invalid token format' });
        }

        const token = bearerToken.split(' ')[1];
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)

        
        const instructors = await Instructor.find();
        res.json(instructors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports={createInstructor,getAllInstructors,assignLectureToInstructor,getAssignedLecturesToInstructor}