// import multer from "multer";
const multer= require('multer');
// Configure Multer middleware
const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // Use original file name for uploaded file
    }
  });
  
  const upload = multer({ storage: storageConfig });
  module.exports= upload;