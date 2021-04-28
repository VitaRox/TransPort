const express = require('express');
const router = express.Router();

// CONTROLLERS
const authControllers = require('../controllers/auth-controllers');

// Logging in
router.post('/login', authControllers.login);

// Logging out
router.post('/logout', authControllers.logout);

module.exports = router;
