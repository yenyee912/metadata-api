const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //image goes /temp first before going to /images
    cb(null, "./temp/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}`);
  },
});

const mediaFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("application/octet-stream") ||
    file.mimetype.startsWith("application/json")
  ) {
    cb(null, true);
  }
  //   reject non json nor tmx file
  else {
    cb("Please upload only json or tmx.", false);
  }
};

const uploadFiles = multer({
  storage: storage,
  fileFilter: mediaFilter,
});

module.exports = uploadFiles;
