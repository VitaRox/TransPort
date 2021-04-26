const HttpError = require('../models/http-error');
const { v4: uuid } = require("uuid");

// DUMMY USER DATA
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

// METHODS

// Get one User by userId
const getUserById = (req, res, next) => {
  console.log("GET request made to fetch a User by their userId");
  // Find user with matching userId
  const userId = req.params.userId;
  const user = DUMMY_USERS.find(u => {
    return u.id === userId;
  });
  // Handle "User not found" error
  if (!user) {
    return next(
      new HttpError('User not found.', 404)
    );
  }
  // Return query results
  res.json({ user });
};

// Create new User account from data submitted in form, auto-generated id
const createNewUser = (req, res, next) => {
  console.log("POST request made to create a new User!");
  // Parse json input and create new User instance
  const { username, email, password, phone } = req.body;
  const newUser = {
    id: uuid(),
    username,
    email,
    password,
    phone,
  };

  // Store User instance in database
  DUMMY_USERS.push(newUser);
  // Send a response to client
  res.status(201).json({ user: newUser });
};

// TODO: remove from production build
// For devs/admins only: get all Users
const getAllUsers = (req, res, next) => {
  console.log("Fetch all Users' data");
  res.json(DUMMY_USERS);
};

exports.getUserById = getUserById;
exports.createNewUser = createNewUser;
exports.getAllUsers = getAllUsers;