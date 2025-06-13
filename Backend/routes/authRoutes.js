const express = require('express');
const router = express.Router();

const register = require('../controllers/authController/register');
const login = require('../controllers/authController/login');
const verifyEmail = require('../controllers/authController/verifyEmail');
const verifyToken = require('../controllers/authController/verifyToken');


router.post('/signup', register);
router.get('/verify-email', verifyEmail);
router.post('/signin', login);
router.post('/verify-token', verifyToken);

module.exports = router;
