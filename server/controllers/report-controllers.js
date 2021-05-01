const HttpError = require('../models/http-error');
const { v4: uuid } = require("uuid");
const { validationResult } = require('express-validator');
const getCoordsFromAddress = require('../util/location');

// DUMMY Report data
let DUMMY_REPORTS = [
  {
    id: '1',
    authorId: '4',
    title: "Fuel Coffee",
    reportText: "I liked this place a lot. Great cold brew!",
    address: {
      street1: "1705 N 45th St",
      street2: '',
      city: "Seattle",
      state: "WA",
      zipcode: "98103"
    },
    location: {
      lat: '47.66144545096609',
      lng: '-122.3369235730304'
    },
    date: '04-11-2020'
  },
  {
    id: '2',
    authorId: '4',
    title: 'Urban Systems Design',
    reportText: "I got my systems designed here and was happy about it.",
    address: {
      street1: "115 N 85th St",
      street2: '202',
      city: "Seattle",
      state: "WA",
      zipcode: "98103"
    },
    location: {
      lat: '47.69149124976197',
      lng: '-122.35759765892428'
    },
    date: '01-02-2019'
  },
  {
    id: '3',
    authorId: '2',
    title: 'Family Dental',
    reportText: "I like my teeth, and so do they for some reason.",
    address: {
      street1: "14 Boston St",
      street2: '',
      city: "Seattle",
      state: "WA",
      zipcode: "98109"
    },
    location: {
      lat: '47.63969492855474',
      lng: '-122.35594603425109'
    },
    date: '05-20-2017'
  },
];

// Get all posted Reports
const getAllReports = async (req, res, next) => {
  console.log("Getting all Reports");
  const reports = DUMMY_REPORTS;
  try {
    /*
      This code will GET from the MongoDB database;
    */
    console.log("Successfully fetched all Reports");
  } catch (error) {
    return next(
      new HttpError(error.message, 404)
    );
  }
  res.status(200).json({ reports });
};

// Get one Report by Id
const getReportById = async (req, res, next) => {
  // Search for Reports with a reportId matching that in the request
  console.log("Fetching one Report by reportId...");
  const reportId = req.params.reportId;
  const report = DUMMY_REPORTS.find(r => {
    return r.id === reportId;
  });
  // Handle "Report Not Found"
  if (!report) {
    return next(
      new HttpError("That particular Report cannot be found.", 404)
    );
  }
  // Return results of query
  res.status(200).json({ report });
};

// Update one Report by reportId if report.authorId === User.id
// TODO: convert to async-await
const updateReport = async (req, res, next) => {
  console.log(`Attempting to update Report`);
  const reportId = req.params.reportId;
  const { title, reportText } = req.body;
  // Throw error if Report no longer exists
  if (!DUMMY_REPORTS.find(r => r.id === reportId)) {
    return next(new HttpError('This Report cannot be found', 404));
  }
    // TODO   is user logged in?
  //      is userId === report.authorId?
  // Get a pointer to the original report with fields copied over
  const updatedReport = { ...DUMMY_REPORTS.find(r => r.id === reportId) };
  // Get the index of the Report we are modifying
  const reportIndex = DUMMY_REPORTS.findIndex(r => r.id === reportId);
  // If: title not supplied....
  if (!title || title.length <= 0) {
    // ....keep old title value
    updatedReport.title = updatedReport.title;
    // else: update the title
  } else {
    updatedReport.title = title;
  }
  if (!reportText || reportText.length <= 0) {
    updatedReport.reportText = updatedReport.reportText;
  } else {
    updatedReport.reportText = reportText;
  }
  // Update the storage
  DUMMY_REPORTS[reportIndex] = updatedReport;
  // Send response
  res.status(200).json({ reports: DUMMY_REPORTS });
};

// Delete one Report by reportId if report.authorId === User.id
const deleteReport = (req, res, next) => {
  const reportId = req.params.reportId;
  console.log(`Deleting report ${reportId}`);
  if (!DUMMY_REPORTS.find(r => r.id === reportId)) {
    return next(new HttpError("This Report doesn't seem to exist", 404));
  }
  DUMMY_REPORTS = DUMMY_REPORTS.filter(r => r.id !== reportId);

  //
  // else: (If exists):
  //    is user logged in?
  //      is userId === report.authorId?
  //        Delete the report
  res.status(200).json({ reports: DUMMY_REPORTS });
};

// Post a new Report (User must be logged-in)
const postNewReport = async (req, res, next) => {
  console.log("POST request made to post new Report");
  const errors = (validationResult(req));
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Report can't have empty title, text, or address", 422));
  }
  // Use object destructuring to obtain contents of request body
  // TODO: authorId will be extracted from userId
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
  const newReport = {
    id: uuid(),
    authorId,
    title,
    reportText,
    address,
    location: coordinates,
    date: newDate.toUTCString()
  };
  console.log(newReport);
  // Add to "database"
  DUMMY_REPORTS.push(newReport);
  // Return an http status to the client
  res.status(201).json({ report: newReport });
};

// Get all Reports by one User
const getAllReportsByUserId = (req, res, next) => {
  // Get account of User associated with this userId
  console.log("Getting User by ID");
  const userId = req.params.userId;
  if (!userId) {
    return next(
      new HttpError("That User cannot be found.", 404)
    );
  }
  // Get all Reports such that thisReport.authorId === userId
  console.log(`Getting all Reports by User ID: ${userId}`);
  const reports = DUMMY_REPORTS.filter(report => report.authorId === userId);
  if (!reports || reports.length === 0) {
    return next(
      new HttpError("This User hasn't posted any Reports yet.", 404)
    );
  }
  // Return results of query
  res.status(200).json({ reports });
};

// Get OutputMap
const getOutputMap = async (req, res, next) => {
  console.log("GET request made to fetch OutputMap");
  res.status(200).json({ message: "GET /data/view appears to be working!!!!!" });
};

// Get the InputMap (interface through which User makes Report)
const getInputMap = async (req, res, next) => {
  console.log("GET request made to fetch InputMap");
  // TODO: insert code here to actually render InputMap from /client
  res.status(200).json({ message: "GET /data/new appears to be working!!" });
};

// Module exports
exports.getAllReports = getAllReports;
exports.getReportById = getReportById;
exports.updateReport = updateReport;
exports.deleteReport = deleteReport;
exports.getOutputMap = getOutputMap;
exports.getInputMap = getInputMap;
exports.getAllReportsByUserId = getAllReportsByUserId;
exports.postNewReport = postNewReport;
