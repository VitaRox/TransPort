const express = require('express');
const router = express.Router();

// This will go from the app.use "filtering" method in server.js
// to here; 'view' will be appended to the filtering path in
// server.js ('/data');
router.get('/view', (req, res, next) => {
  console.log("GET request made to fetch OutputMap");
  res.json({ message: "GET /data/view appears to be working!!!!!" });
});

// This will load the InputMap (Map and a ReportForm) for the user to create a Report;
router.get('/new', (req, res, next) => {
  console.log("GET request made to fetch InputMap");
  res.json({ message: "GET /data/new appears to be working!!" });
});

module.exports = router;
