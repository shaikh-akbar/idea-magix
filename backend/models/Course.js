// models/Course.js
const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor' 
    },
   
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    lectures: [lectureSchema] 
});

module.exports = mongoose.model('Course', courseSchema);
