const express = require('express');

const verifyAuth = require('../middlewares/verifyAuth');
const { getUserById } = require('../controllers/userController');

const router = express.Router();

// Route to get the user by ID from the token
router.get('/me', verifyAuth, getUserById);
router.post('/register', createUser);

module.exports = router;
