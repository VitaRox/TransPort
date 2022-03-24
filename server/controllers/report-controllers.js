const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const getCoordsFromAddress = require('../util/location');
const mongoose = require('mongoose');
const Report = require('../models/report');
const User = require('../models/user');

// Get all posted Reports
const getAllReports = async (req, res, next) => {
  console.log("Getting all Reports");
  let reports;
  try {
    reports = await Report.find();
    console.log("Successfully fetched all Reports");
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
  res.status(200).json({ reports: reports.map(report => report.toObject({ getters: true })) });
};

// Get one Report by Id
const getReportById = async (req, res, next) => {
  console.log("Fetching one Report by reportId...");
  const reportId = req.params.reportId;
  let report;
  try {
    report = await Report.findById(reportId);
    // Handle problem with GET request generally
  } catch (err) {
    return next(new HttpError("Something went wrong whilst fetching Report...", 500));
  }

  if (!report) {
    return next(new HttpError(
      "Could not find the Report with the provided ID",
      404
    ));
  }
  // Return results of query
  res.status(200).json({ report: report.toObject({ getters: true }) });
};

// Update one Report by reportId
const updateReport = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  console.log(`Attempting to update Report`);

  const { title, reportText } = req.body;
  const reportId = req.params.reportId;

  // Try to get Report that is to be updated from database
  let report;
  try {
    report = await Report.findById(reportId);
    console.log(report);
  } catch (err) {
    return (
      next(new HttpError('Something went wrong, could not update place.', 500))
    );
  }

  // Update values
  console.log(`Updating Report with new values: ${title} and ${reportText}`);
  report.title = title;
  report.reportText = reportText;

  try {
    // Update the database
    await report.save();
  } catch (err) {
    return next(new HttpError("Update Report failed", 500));
  }
  // Send response
  res.status(200).json({ report: report.toObject({ getters: true }) });
};

// Delete one Report by reportId if report.authorId === User.id
const deleteReport = async (req, res, next) => {

  const reportId = req.params.reportId;
  console.log(`Deleting report ${reportId}`);

  let report;
  // Try to find Report by id; handle server/database error
  try {
    report = await Report.findById(reportId).populate('authorId');
  } catch (error) {
    return next(new HttpError("Something went wrong deleting this Report.", 500));
  }

  // Handle instance in which Report not found
  if (!report) {
    return next(new HttpError("We could not find a Report with this ID", 404));
  }

  // Try to delete Report we found
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await report.remove({ session: sess });
    // Remove the Id corresponding to this Report from User's list of posted Reports
    report.authorId.reports.pull(report);
    await report.authorId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Delete Report failed', 500));
  }
  res.status(200).json({ message: `Successfully deleted Report ${reportId}` });
};

// Post a new Report (User must be logged-in)
const postNewReport = async (req, res, next) => {
  console.log("POST request made to post new Report");
  const errors = (validationResult(req));
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Report can't have empty title, text, or address", 422));
  }

  const { authorId, title, reportText, address } = req.body;

  // Convert address to geocoordinates
  let coordinates;
  try {
    coordinates = await getCoordsFromAddress(address);
  } catch (error) {
    return next(error);
  }

  // Create new Date object from vanilla JS for auto-setting the current UTC date
  const newDate = new Date();
  const newReport = new Report({
    authorId,
    title,
    reportText,
    address,
    image: req.file.path,
    location: coordinates,
    date: newDate.toUTCString()
  });

  let user;
  try {
    user = await User.findById(authorId);
  } catch (err) {
    return next(new HttpError("postNewReport failed", 500));
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id', 404);
    return next(error);
  }

  console.log(`User: ${user}`);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newReport.save({ session: sess });
    user.reports.push(newReport);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Report posting failed", 500));
  }
  // Return an http status to the client
  res.status(201).json({ report: newReport.toObject({ getters: true })});
};

// Get all Reports by one User
const getAllReportsByUserId = async (req, res, next) => {

  // Get account of User associated with this userId
  console.log("Getting User by ID");
  const userId = req.params.userId;

  if (!userId) {
    return next(
      new HttpError("That User cannot be found.", 404)
    );
  }

  console.log(`Getting all Reports by User ID: ${userId}`);
  let reports;
  try {
    reports = await Report.find({ authorId: userId });
  } catch (err) {
    return next(
      new HttpError('GET request failed', 500)
    )
  }

  if (!reports || reports.length === 0) {
    return next(
      new HttpError('This User has not posted any Reports yet', 404));
  }
  // Return results of query
  res.status(200).json({ reports: reports.map(report => report.toObject({ getters: true })) });
};


// Module exports
exports.getAllReports = getAllReports;
exports.getReportById = getReportById;
exports.updateReport = updateReport;
exports.deleteReport = deleteReport;
exports.getAllReportsByUserId = getAllReportsByUserId;
exports.postNewReport = postNewReport;
