const express = require('express');
const router = express.Router();
const videoProjectController = require('../controllers/videoProjectController.cjs');
const authenticateToken = require('../middleware/authenticateToken.cjs');
const upload = require('../middleware/upload.cjs'); 


// router.use(authenticateToken);

router.post('/', upload.single('videoFile'), videoProjectController.createVideoProject); 
router.get('/', videoProjectController.getAllVideoProjects);
router.get('/:id', videoProjectController.getVideoProjectById);
router.put('/:id', upload.single('videoFile'), videoProjectController.updateVideoProject);
router.delete('/:id', videoProjectController.deleteVideoProject);

module.exports = router;
