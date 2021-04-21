const express = require('express');
const router = express.Router();

// This represents our custom Error subclass instance
const HttpError = require('../models/http-error');

// Dummy User data
const DUMMY_USERS = [
  {
    id: '1',
    username: 'flexingAardvark',
    email: 'aVark@email.com',
    password: 'pass'
  },
  {
    id: '2',
    username: 'sparkleBoi420',
    email: 'sp420@ourmail.com',
    password: 'badonk'
  },
  {
    id: '3',
    username: 'Princess_CremeDeMenthe',
    email: 'skaarsgard@biffMail.com',
    password: 'crimsonturkey'
  },
  {
    id: '4',
    username: 'Clifford_Notes',
    email: 'student@lawyer.com',
    password: 'chipperSun'
  },
  {
    id: '5',
    username: 'Doge_Fan_9',
    email: 'mymail@yourmail.com',
    password: 'quipSprackter'
  },
  {
    id: '6',
    username: 'Jinx_Monsoon',
    email: 'artspore@address.org',
    password: 'yupYesYeah'
  },
];

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


// Routes

// This will go from the app.use "filtering" method in server.js
// to here; 'view' will be appended to the filtering path in
// server.js ('/data');
router.get('/view', (req, res, next) => {
  console.log("GET request made to fetch OutputMap");
  res.json({ message: "GET /data/view appears to be working!!!!!" });
});

// Get ALL Reports
router.get('/view/reports', (req, res, next) => {
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
  res.json(reports);
});

// Get one Report by reportId
router.get('/view/reports/:reportId', (req, res, next) => {
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
});

// Get all Reports by a given User
// TODO: put dummy data in it's own file and import so can use both USERS and REPORTS
router.get('/view/reports/user/:userId', (req, res, next) => {
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
});

// This will load the InputMap (Map and a ReportForm) for the user to create a Report;
// TODO: handle error where map cannot be loaded
router.get('/new', (req, res, next) => {
  console.log("GET request made to fetch InputMap");
  // TODO: insert code here to actually render InputMap from /client
  res.json({ message: "GET /data/new appears to be working!!" });
});

// Post a new Report
// TODO: make it send data from ReportForm in the request body; handle errors
router.post('/new', (req, res, next) => {
  console.log("POST request made to post new Report");
  res.json({ message: "Posted new Report!" });
});



module.exports = router;
