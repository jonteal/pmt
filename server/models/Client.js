const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  emailAddress: {
    type: String
  },
  companyName: {
    type: String
  }
});

module.exports = mongoose.model('Client', ClientSchema);