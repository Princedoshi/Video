const multer = require('multer');

// Set up Multer middleware to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

// Define the file filter to accept only certain file types (e.g., mp4)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') { // Adjust the mimetype as needed
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only MP4 files are allowed.'), false); // Reject the file
  }
};

// Set up Multer middleware with the configured storage and file filter
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100 // Set a file size limit (e.g., 100MB)
  },
  fileFilter: fileFilter
});

module.exports = upload;
