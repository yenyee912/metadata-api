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
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  }
  //reject non image
  else {
    cb("Please upload only image or video.", false);
  }
};

const uploadImage = multer({
  storage: storage,
  fileFilter: mediaFilter,
});

module.exports = uploadImage;
