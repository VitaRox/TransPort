const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require(`../models/user`);

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
    reports: []
  });
  console.log(newUser);
  // Add to MongoDb database with mongoose save() method
  // save() also creates a unique id on the object being created
  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError("Signup failed", 422));
  }
  // Send a response to client
  res.status(201).json({ user: newUser.toObject({ getters: true })});
};

// TODO: remove from production build
// For devs/admins only: get all Users
const getAllUsers = async (req, res, next) => {
  console.log("Fetch all Users' data");
  let users;
  try {
    users = await User.find({}, '-password');
    console.log("Successfully fetched all Users");
  } catch (error) {
    return next(new HttpError(error.message, 404));
  }
  res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
};

// Update User data, provided account exists and User is logged-in
const updateUser = async (req, res, next) => {
  console.log(`Attempting to update User account...`);
  const userId = req.params.userId;
  const { newUsername, newEmail, newPassword } = req.body;
  let user;
  try {
    user = await User.findById(userId);
    console.log(`User found is: ${user}`);
  } catch (err) {
    return next(new HttpError('Something went wrong.', 500));
  }
  if (!user) {
    return next(new HttpError('This User cannot be found.', 404));
  }
  // Check for errors in what is passed
  const errors = (validationResult(req));
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new HttpError("User can't have empty username, email, or password", 422));
  }
  console.log("User account successfully fetched");
  // Get a pointer to the original report with fields copied over;
  // update any values when updated values are provided by user,
  // otherwise keep the old values the Report had when fetched
  if (newUsername) {
    user.username = newUsername;
  }
  if (newEmail) {
    user.email = newEmail;
  }
  if (newPassword) {
    user.password = newPassword;
  }
  try {
    // Update the database
    await user.save();
  } catch (err) {
    return next(new HttpError("Update User failed", 500));
  }
  // Send response
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

// TODO: Delete User account (must be logged-in)
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
