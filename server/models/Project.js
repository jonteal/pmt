const mongoose = require('mongoose');
const moment = require('moment');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed']
  },
  notes: {
    type: String
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  startDate: {
    type: String,
    get: (timeValue) => moment(timeValue).format('MM/DD/YYYY')
  },
  deadline: {
    type: String,
    get: (timeValue) => moment(timeValue).format('MM/DD/YYYY')
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format('MM/DD/YYYY')
  },
  clientBudget: {
    type: Number
  },
  projectEstimate: {
    type: Number
  }
});

module.exports = mongoose.model('Project', ProjectSchema);