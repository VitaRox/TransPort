const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const uniqueValidator = require(`mongoose-unique-validator`);

// The definition of our User data entity
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  dateJoined: { type: String },
  reports: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Report' }]
});

// Enforce use of a unique email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
