const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const reportControllers = require('../controllers/report-controllers');

// Middleware
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

/* End of imports */

// Get ALL Reports
router.get('/view/reports', reportControllers.getAllReports);

// Get one Report by reportId
router.get('/view/reports/:reportId', reportControllers.getReportById);

// Get all Reports by a given User
router.get('/view/reports/user/:userId', reportControllers.getAllReportsByUserId);

// Checks incoming request for a valid JWT
router.use(checkAuth);

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
