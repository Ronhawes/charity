const multer = require("multer");
const path = require("path");
const { relaxDirectory } = require("./../Utils/media");

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const relax_path = relaxDirectory(__dirname);
    if (!relax_path) {
      throw { custom: true, message: "Multer failed to get storage path" };
    }
    cb(null, relax_path); // Destination directory where files will be saved
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname +
      "multer-save" +
      Date.now() +
      path.extname(file.originalname);
    req.fileName = fileName; // Save the uploaded file name in the request object
    cb(null, fileName); // Generating a unique filename for the uploaded file
  },
});

// Initialize multer and specify storage and file size limit options
const fileUpload = multer({
  storage: storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // Maximum file size set to 30MB
}).single("document"); // 'document' is the name attribute in your form input field

module.exports = fileUpload;
