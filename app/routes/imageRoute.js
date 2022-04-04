var express = require("express");
var router = express.Router({ mergeParams: true });

var imageController = require("../controllers/imageController");
const upload = require("../middleware/upload_image");

router.get("/", imageController.getImageByContractAddress);

router.get("/:fileName", imageController.getOneImage);

router.post("/", upload.single("image"), imageController.uploadImages);

// router.post('/', upload.array("image", 5), imageController.uploadImages)

// router.delete('/', imageController.deleteImageByContractAddress)

module.exports = router;
