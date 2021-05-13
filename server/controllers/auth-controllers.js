const HttpError = require('../models/http-error');
const User = require('../models/user');

// Login to existing User account
const login = async (req, res, next) => {
  console.log("POST request made to /auth/login: call me Kenny Loggins, because we're logging on in!");
  const { username, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ username: username });
  } catch (err) {
    throw next(new HttpError('Something went wrong, try again later', 500));
  }
  // Check credentials (username and password);
  if (!identifiedUser) {
    return next(new HttpError(`No User by this username`, 404));
  }
  if (identifiedUser.password !== password) {
    return next(new HttpError(`Password is incorrect`, 401));
  }
  res.json({ message: "Logged in.", user: identifiedUser.toObject({ getters: true })});
};

// Log User out of their account
// TODO: implement this with authN
const logout = async (req, res, next) => {
  console.log("POST request made to /auth/logout: logging User out.");
};

// Module exports
exports.login = login;
exports.logout = logout;
