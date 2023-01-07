const mongoose = require('mongoose');

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
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
  },
  activityComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityComment',
    }
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);