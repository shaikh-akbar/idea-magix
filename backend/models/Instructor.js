// models/instructor.js
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    lectures: [{
        date: {
            type: Date,
            required: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
       
    }]
});

module.exports = mongoose.model('Instructor', instructorSchema);
