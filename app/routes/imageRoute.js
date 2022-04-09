var express = require("express");
var router = express.Router({ mergeParams: true });

var avatarController = require("../controllers/avatarController");
const upload = require("../middleware/upload_image");

router.get("/", avatarController.getAllAvatar);

router.get("/:image_hash", avatarController.getAvatarByImageHash);

router.post("/", upload.single("image"), avatarController.uploadAvatar);

module.exports = router;
