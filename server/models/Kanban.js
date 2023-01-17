const mongoose = require('mongoose');
const moment = require('moment');

const KanbanSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (timeValue) => moment(timeValue).format('MM/DD/YYYY')
  },
});

module.exports = mongoose.model('Kanban', KanbanSchema);