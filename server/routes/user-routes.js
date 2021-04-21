const express = require('express');
const router = express.Router();

// CONTROLLERS
const userControllers = require('../controllers/user-controllers');

// Admin-only route for dev purposes: show all Users' data
// TODO: remove this before production build!!!!!!!
router.get(`/`, userControllers.getAllUsers);

// Fetches an existing User account by userId;
router.get(`/:userId`, userControllers.getUserById);

// Creates a new User account with input from response body
// TODO: verify this is working with Postman or something
router.post(`/`, userControllers.createNewUser);

module.exports = router;
