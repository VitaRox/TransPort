const express = require('express');
const router = express.Router();

// CONTROLLERS
const reportControllers = require('../controllers/reports-controllers');

// ROUTES

// This will go from the app.use "filtering" method in server.js
// to here; 'view' will be appended to the filtering path in
// server.js ('/data');
router.get('/view', reportControllers.getOutputMap);

// Get ALL Reports
router.get('/view/reports', reportControllers.getAllReports);

// Get one Report by reportId
router.get('/view/reports/:reportId', reportControllers.getReportById);

// Get all Reports by a given User
router.get('/view/reports/user/:userId', reportControllers.getAllReportsByUserId);

// This will load the InputMap (Map and a ReportForm) for the user to create a Report;
// TODO: handle error where map cannot be loaded
router.get('/new', reportControllers.getInputMap);

// Post a new Report
// TODO: make it send data from ReportForm in the request body; handle errors
router.post('/new', reportControllers.postNewReport);



module.exports = router;
