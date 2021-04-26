const HttpError = require('../models/http-error');

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
const login = (req, res, next) => {
  console.log("POST request made to /auth/login: call me Kenny Loggins, because we're logging on in!");
  const { username, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(u => u.username === username);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(`No User by this username`);
  }
  res.json({ message: "Logged in.", user: identifiedUser });
};

// Log User out of their account
const logout = (req, res, next) => {
  console.log("POST request made to /auth/logout: logging User out.");
};

// Module exports
exports.login = login;
exports.logout = logout;
