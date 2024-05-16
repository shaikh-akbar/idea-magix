
const express = require('express');
const { createUser, loginCtrl } = require('../controller/auth');
const {  authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/create-user', createUser);
router.post('/login', loginCtrl);
module.exports = router;
