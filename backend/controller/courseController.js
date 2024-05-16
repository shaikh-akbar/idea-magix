const Course = require("../models/Course");


const createCourse = async (req, res) => {
    console.log('Decoded token payload:', req.user);

    const { name, level, description, image, lectures } = req.body;

    try {
        // Create the course
        const course = new Course({
            name,
            level,
            description,
            image,
            lectures 
        });

        await course.save();

        res.status(201).json({ message: 'Course added successfully', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { name, level, description, image, lectures } = req.body;

    try {
        let course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        course.name = name;
        course.level = level;
        course.description = description;
        course.image = image;
        course.lectures = lectures;

        await course.save();

        res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports={createCourse,updateCourse,deleteCourse}