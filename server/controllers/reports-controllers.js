const HttpError = require('../models/http-error');

// Dummy Report data
const DUMMY_REPORTS = [
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
    dateTime: '04-11-2020'
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
    dateTime: '01-02-2019'
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
    dateTime: '05-20-2017'
  },
];

// Get all posted Reports
const getAllReports = (req, res, next) => {
  console.log("Getting all Reports");
  const reports = DUMMY_REPORTS;
  try {
    /* TODO: Put equivalent code operation to line 117 here in final product.
      This code will GET from the MongoDB database;
    */
    console.log("Successfully fetched all Reports");
  } catch (error) {
    return next(
      new HttpError(error.message, 404)
    );
  }
  res.json({ reports });
};

// Get one Report by Id
const getReportById = (req, res, next) => {
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
  res.json({ report });
};

const postNewReport = (req, res, next) => {
  console.log("POST request made to post new Report");
  res.json({ message: "Posted new Report!" });
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
  if (!reports) {
    return next(
      new HttpError("This User hasn't posted any Reports yet.", 404)
    );
  }
  // Return results of query
  res.json({ reports });
};

// Get OutputMap
const getOutputMap = (req, res, next) => {
  console.log("GET request made to fetch OutputMap");
  res.json({ message: "GET /data/view appears to be working!!!!!" });
};

// Get the InputMap (interface through which User makes Report)
const getInputMap = (req, res, next) => {
  console.log("GET request made to fetch InputMap");
  // TODO: insert code here to actually render InputMap from /client
  res.json({ message: "GET /data/new appears to be working!!" });
};

exports.getAllReports = getAllReports;
exports.getReportById = getReportById;
exports.getOutputMap = getOutputMap;
exports.getInputMap = getInputMap;
exports.getAllReportsByUserId = getAllReportsByUserId;
exports.postNewReport = postNewReport;
