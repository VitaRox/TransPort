const express = require('express');
const app = express();
require('dotenv').config();

// Port will either be 4000 by default or, if 4000 is in-use, another available port;
const port = 4000 || process.env.PORT;

// Import our custom Error subclass
const HttpError = require(`./models/http-error`);

// Database connection, file system
const mongoose = require('mongoose');
const url = process.env.DB_URL;
const fs = require('fs');

// Routing middleware imports
const staticRoutes = require('./routes/static-routes');  // Not 100% sure I'll need this
const reportRoutes = require('./routes/report-routes');
const userRoutes = require('./routes/user-routes');

// Middleware to parse bodies of JSON requests made to the API
app.use(express.json());

// Set headers on all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Static routes middleware
app.use('/api', staticRoutes);

// This will filter to only pass requests made to paths beginning with '/'
// to the router middleware in ./routes/data-routes;
// reportRoutes will be used to route requests/responses to and from /data/view
// and /data/new (if user is logged in)
app.use('/api/data', reportRoutes);

// This will filter requests to user-related paths
// (e.g. creating a User Account, viewing User Account)
app.use('/api/users', userRoutes);

// Handle case in which path doesn't exist
app.use((req, res, next) => {
  const error = new HttpError('could not find this route', 404);
  throw error;
});

// Default error handler
app.use((error, req, res, next) => {
  if (res.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
    .json(
      { message: error.message || "An error occurred." }
    );
});

// Connect to database server
mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(`${url}`)
  .then(
    // Listens on an available port
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  )
  .catch(error => {
    console.log(error);
  });
