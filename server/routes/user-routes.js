const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userControllers = require('../controllers/user-controllers');

// Admin-only route for dev purposes: show all Users' data
// TODO: remove this before production build!!!!!!!
router.get(`/`, userControllers.getAllUsers);

// Creates a new User account with input from response body
router.post(
  `/signup`,
  [
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('username')
      .not()
      .isEmpty(),
    check('password')
      .isStrongPassword()
  ],
  userControllers.createNewUser
);

// Fetches an existing User account by userId;
router.get(`/:userId`, userControllers.getUserById);

// Allows User to update their account info
router.patch(`/:userId`,
[
  check('email')
    .normalizeEmail()
    .isEmail(),
  check('username')
    .not()
    .isEmpty(),
  check('password')
    .isStrongPassword()
],
  userControllers.updateUser);

// Allows User to delete their account
router.delete(`/:userId`, userControllers.deleteUser);

module.exports = router;
