// models/lecture.js
const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Lecture', lectureSchema);
