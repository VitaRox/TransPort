const HttpError = require('../models/http-error');
const User = require('../models/user');


// DUMMY User data
let DUMMY_USERS = [
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
  // Check credentails (username and password);
  if (!identifiedUser) {
    return next(new HttpError(`No User by this username`, 404));
  }
  if (identifiedUser.password !== password) {
    return next(new HttpError(`Password is incorrect`, 401));
  }
  res.json({ message: "Logged in.", user: identifiedUser.toObject({ getters: true })});
};

// Log User out of their account
const logout = async (req, res, next) => {
  console.log("POST request made to /auth/logout: logging User out.");
};

// Module exports
exports.login = login;
exports.logout = logout;
