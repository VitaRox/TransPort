const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reportControllers = require('../controllers/report-controllers');
const fileUpload = require('../middleware/file-upload');


router.get('/view', reportControllers.getOutputMap);

// Get ALL Reports
router.get('/view/reports', reportControllers.getAllReports);

// Get one Report by reportId
router.get('/view/reports/:reportId', reportControllers.getReportById);

// Allows User to edit/update and existing Report they've posted
router.patch('/view/reports/:reportId',
  [
    check('title').not().isEmpty(),
    check('reportText').isLength({ min: 6 })

  ],
  reportControllers.updateReport
);

// Allows a User to delete a Report they have posted
router.delete('/view/reports/:reportId', reportControllers.deleteReport);

// Get all Reports by a given User
router.get('/view/reports/user/:userId', reportControllers.getAllReportsByUserId);

// This will load the InputMap (Map and a ReportForm) for the user to create a Report
router.get('/new', reportControllers.getInputMap);

// Post a new Report
router.post(
  '/new',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(),
    check('reportText').isLength({ min: 6 }),
    check('address').not().isEmpty()
  ],
  reportControllers.postNewReport
);

module.exports = router;
