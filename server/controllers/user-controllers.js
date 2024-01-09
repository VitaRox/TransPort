const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = require(`../models/user`);

// METHODS

// Login to existing User account
const login = async (req, res, next) => {
  console.log("POST request made to api/users/login: call me Kenny Loggins, because we're logging on in!");
  const { username, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ username: username });
  } catch (err) {
    return next(new HttpError('Something went wrong, try again later', 500));
  }
  // Check credentials (username and password);
  if (!identifiedUser) {
    return next(new HttpError(`No user by this username`, 404));
  }
  if (identifiedUser.password !== password) {
    return next(new HttpError(`Password is incorrect`, 401));
  }
  res.json({ message: "Logged in.", user: identifiedUser.toObject({ getters: true })});
};

// Log User out of their account
// TODO: implement this with authN
const logout = async (req, res, next) => {
  console.log("POST request made to api/users/logout: logging User out.");
};

// Get one User by userId
const getUserById = async (req, res, next) => {
  // Find user with matching userId
  const userId = req.params.userId;
  console.log(`Fetching User ${userId}`);

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError(
      `I promise, this kind of thing has never happened before!`,
      500)
    );
  }
  // Handle "User not found" error
  if (!user) {
    return next(
      new HttpError('User not found.', 404)
    );
  }
  // Return query results
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

// Create new User account from data submitted in form, auto-generated id
const createNewUser = async (req, res, next) => {
  console.log("POST request made to create a new User!");
  // Validate user input
  const errors = validationResult(req);
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
    image: req.file.path,
    dateJoined: dateJoined.toUTCString(),
    reports: []
  });
  console.log(newUser);
  // Add to MongoDb database with mongoose save() method
  // save() also creates a unique id on the object being created
  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again.',
      500
    );
    return next(error);
  }
  // Send a response to client
  res.status(201).json({ user: newUser.toObject({ getters: true })});
};

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

// Delete User account
const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(`Looking for user ${userId}...`);

  let user;
  // Try to find User by id; handle server/database error
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new HttpError("Something went wrong fetching the User to delete.", 500));
  }

  // Handle instance in which User not found
  if (!user) {
    return next(new HttpError("We could not find a User with this ID", 404));
  }

  // Try to delete User we found
  try {
    console.log(`Deleting user ${userId}`);
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await user.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Delete User failed', 500));
  }
  res.status(200).json({ message: `Successfully deleted User ${userId}` });
};

// Module exports
exports.getUserById = getUserById;
exports.createNewUser = createNewUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
exports.login = login;
exports.logout = logout;
