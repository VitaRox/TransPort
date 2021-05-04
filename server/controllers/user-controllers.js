const HttpError = require('../models/http-error');
const { v4: uuid } = require("uuid");
const { validationResult } = require('express-validator');
const User = require(`../models/user`);


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
  res.status(200).json({ user });
};

// Create new User account from data submitted in form, auto-generated id
const createNewUser = async (req, res, next) => {
  console.log("POST request made to create a new User!");
  // Validate user input
  const errors = (validationResult(req));
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("Must use a strong password, unique username, and valid email address", 422));
  }
  // Parse json input (i.e. new User signup data)
  const { username, email, password } = req.body;
  // Check for case in which an account associated with this email already exists;
  // this is to prevent the creation of duplicate accounts
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('findOne operation failed', 500));
  }
  if (existingUser) {
    return next(new HttpError('Account associated with this email already exists', 422));
  }
  // Create Date object to timestamp new User creation (dateJoined)
  const dateJoined = new Date();
  // Create new User instance
  const newUser = new User({
    username,
    email,
    password,
    dateJoined: dateJoined.toUTCString(),
    reports
  });
  // Add to MongoDb database with mongoose save() method
  // save() also creates a unique id on the object being created
  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Storing new User to database failed", 422));
  }
  // Send a response to client
  res.status(201).json({ user: newUser });
};

// TODO: remove from production build
// For devs/admins only: get all Users
const getAllUsers = (req, res, next) => {
  console.log("Fetch all Users' data");
  res.status(200).json({ users: DUMMY_USERS });
};

// Update User data, provided account exists and User is logged-in
const updateUser = (req, res, next) => {
  console.log(`Attempting to locate User account...`);
  const userId = req.params.userId;
  const { username, email, password } = req.body;
  if (!DUMMY_USERS.find(u => u.id === userId)) {
    throw new HttpError('This User cannot be found.', 404);
  }
  console.log("User account successfully fetched");
  // Get a pointer to the original report with fields copied over
  const updatedUser = { ...DUMMY_USERS.find(u => u.id === userId) };
  // Get the index of the Report we are modifying
  const userIndex = DUMMY_USERS.findIndex(u => u.id === userId);
  // Update whatever needs updating; leave everything else as previously defined
  console.log("Updating all non-empty values provided by user...");
  if (username.length > 0) {
    updatedUser.username = username;
  }
  if (email.length > 0) {
    updatedUser.email = email;
  }
  if (password.length > 0) {
    updatedUser.password = password;
  }
  // Update the storage
  DUMMY_USERS[userIndex] = updatedUser;
  res.status(200).json({ users: DUMMY_USERS });
};

// Delete User account (must be logged-in)
const deleteUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log(`Looking for user ${userId}...`);
  if (!DUMMY_USERS.find(u => u.id === userId)) {
    throw new HttpError("User not found.", 404);
  }
  console.log(`Deleting user ${userId}`);
  DUMMY_USERS = DUMMY_USERS.filter(u => u.id !== userId);
  res.status(200).json({ users: DUMMY_USERS });
};


// Module exports
exports.getUserById = getUserById;
exports.createNewUser = createNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
