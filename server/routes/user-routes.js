const express = require('express');
const router = express.Router();

// Dummy userId data for test;
const userId = 1;

// Fetches a  User account by userId;
router.get(`/users/${userId}`, (req, res, next) => {
  console.log("GET request made to fetch OutputMap");
  res.json({ message: "GET an individual user appears to be working!!!!!" });
});

module.exports = router;
