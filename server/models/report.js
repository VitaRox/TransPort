const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our Report data entity
const reportSchema = new Schema({
  title: { type: String, required: true },
  reportText: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: {type: Number, required: true}
  },
  authorId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Report', reportSchema);
