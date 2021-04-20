const express = require('express');
const app = express();

// port will either be 4000 by default or, if 4000 is in-use, another available port;
const port = 4000 || process.env.PORT;

// bodyParser is a method for parsing the bodies of requests & responses;
const bodyParser = require('body-parser');

// Routing middleware;
const staticRoutes = require('./routes/static-routes');
const dataRoutes = require('./routes/data-routes');
const userRoutes = require('./routes/user-routes');
const authRoutes = require('./routes/auth-routes');

// Static routes middleware
app.use('/', staticRoutes);

// This will filter to only pass requests made to paths beginning with '/'
// to the router middleware in ./routes/data-routes;
// dataRoutes will be used to route requests/responses to and from /data/view
// and /data/new (if user is logged in)
app.use('/data', dataRoutes);

// This will filter requests to user-related paths
// (e.g. creating a User Account, viewing User Account, signing out)
app.use('/users', userRoutes);

// Send requests to appropriate middleware for signing in, signing out
app.use('/auth', authRoutes);

// Listens on the port of choice
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
