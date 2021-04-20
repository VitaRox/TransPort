const express = require('express');
const router = express.Router();

// Handles static routes such as the initial HomeScreen render
router.get('/', (req, res, next) => {
  console.log("Fetching HomeScreen..");
  res.send('<p>Will render the HomeScreen upon initial nav to site</p>');
});

module.exports = router;
