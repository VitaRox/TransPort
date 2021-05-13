const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authControllers = require('../controllers/auth-controllers');

// Logging in
router.post(
  '/login',
  check('username')
    .not()
    .isEmpty(),
  check('password')
    .not()
    .isEmpty(),
  authControllers.login);

// Logging out
router.post('/logout', authControllers.logout);

module.exports = router;
