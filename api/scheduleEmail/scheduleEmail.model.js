
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  date: Number,
  to: { type: String },
  status: { type: String, enum: ['schedule', 'success', 'rejected'] ,default : "schedule" },
  emailText: String,
  subject: String,
  createdBy: String,
  updatedBy: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('schedule', schema);