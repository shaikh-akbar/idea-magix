// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
    },
    qualifications: {
        type: String,
        required: function() {
            return this.role === 'instructor';
        }
    },
});

module.exports = mongoose.model('User', userSchema);
