const mongoose = require('mongoose');

const videoProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  creationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
  videoUrl: String,
});

module.exports = mongoose.model('VideoProject', videoProjectSchema);
