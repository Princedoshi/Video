const VideoProject = require('../models/videoProjectModel.cjs');

exports.createVideoProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const videoUrl = req.file ? req.file.path : null;

    const videoProjectData = {
      title,
      description,
      videoUrl,
    };

    const videoProject = await VideoProject.create(videoProjectData);
    res.status(201).json(videoProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const Redis = require('ioredis');
const redisConfig = require('../config/redisConfig');

const redisClient = new Redis(redisConfig);

// Controller function to get all video projects with caching
exports.getAllVideoProjects = async (req, res) => {
  try {
    // Check if data exists in Redis cache
    const cachedData = await redisClient.get('allVideoProjects');
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    // If data is not cached, fetch it from the database
    const videoProjects = await VideoProject.find();

    // Cache the data in Redis for future requests
    await redisClient.set('allVideoProjects', JSON.stringify(videoProjects));

    return res.status(200).json(videoProjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getVideoProjectById = async (req, res) => {
  try {
    const videoProject = await VideoProject.findById(req.params.id);
    if (!videoProject) {
      return res.status(404).json({ message: 'Video project not found' });
    }
    res.status(200).json(videoProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVideoProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedVideoProjectData = {
      title,
      description,
    };

    if (req.file) {
      updatedVideoProjectData.videoUrl = req.file.path;
    }

    const updatedVideoProject = await VideoProject.findByIdAndUpdate(req.params.id, updatedVideoProjectData, { new: true });
    if (!updatedVideoProject) {
      return res.status(404).json({ message: 'Video project not found' });
    }
    res.status(200).json(updatedVideoProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteVideoProject = async (req, res) => {
  try {
    const deletedVideoProject = await VideoProject.findByIdAndDelete(req.params.id);
    if (!deletedVideoProject) {
      return res.status(404).json({ message: 'Video project not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
