const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authControllers = require('../controllers/auth-controllers');

// Logging in
router.post('/login', check, authControllers.login);

// Logging out
router.post('/logout', authControllers.logout);

module.exports = router;
