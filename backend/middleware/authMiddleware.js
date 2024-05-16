

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            throw new Error('Invalid token format');
        }

        const token = bearerToken.split(' ')[1];

       
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

       
        const { userId } = decodedToken;

        
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

       
        req.user = user;


        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized access' });
    }
};

const authenticateInstructor = async (req, res, next) => {
    try {
        // Get the bearer token from the request header
        const bearerToken = req.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            throw new Error('Invalid token format');
        }

        // Extract the token from the bearer token string
        const token = bearerToken.split(' ')[1];

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Retrieve user information from the decoded token
        const { userId } = decodedToken;

        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user is an instructor (you can modify this condition based on your user model)
        if (user.role !== 'instructor') {
            throw new Error('Unauthorized access: User is not an instructor');
        }

        // Attach the user object to the request
        req.user = user;

        // Call the next middleware
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized access' });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        // Assuming the user object is attached to the request (e.g., using authentication middleware)
        const { email } = req.user;

        // Check if the logged-in user is an admin
        const adminUser = await User.findOne({ email });
        if (!adminUser || adminUser.role !== "admin") {
            throw new Error('Unauthorized access: You are not an admin');
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: 'Unauthorized access: You are not authorized to perform this action' });
    }
};

module.exports = {authenticateUser,authenticateInstructor,isAdmin};
