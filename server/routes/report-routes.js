const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reportControllers = require('../controllers/report-controllers');

// ROUTES

// This will go from the app.use "filtering" method in server.js
// to here; 'view' will be appended to the filtering path in
// server.js ('/data');
router.get('/view', reportControllers.getOutputMap);

// Get ALL Reports
router.get('/view/reports', reportControllers.getAllReports);

// Get one Report by reportId
router.get('/view/reports/:reportId', reportControllers.getReportById);

// Allows User to edit/update and existing Report they've posted
router.patch('/view/reports/:reportId', reportControllers.updateReport);

// Allows a User to delete a Report they have posted
router.delete('/view/reports/:reportId', reportControllers.deleteReport);

// Get all Reports by a given User
router.get('/view/reports/user/:userId', reportControllers.getAllReportsByUserId);

// This will load the InputMap (Map and a ReportForm) for the user to create a Report
// TODO: handle error where map cannot be loaded
router.get('/new', reportControllers.getInputMap);

// Post a new Report
// TODO: make it receive data from ReportForm in the request body; handle errors
router.post(
  '/new',
  [
    check('title').not().isEmpty(),
    check('reportText').isLength({ min: 5 }),
    check('address').not().isEmpty()
  ],
  reportControllers.postNewReport
);

module.exports = router;
