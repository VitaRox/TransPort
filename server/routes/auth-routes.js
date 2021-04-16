const express = require('express');
const router = express.Router();

// Logging in;
router.post('/login', (req, res, next) => {
  console.log("POST request made to /auth/login: call me Kenny Loggins, because we're logging on in!");
});

// Logging out;
router.post('/logout', (req, res, next) => {
  console.log("POST request made to /auth/logout: logging User out.");
});

module.exports = router;
