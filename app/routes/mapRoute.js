var express = require("express");
var router = express.Router({ mergeParams: true });

var mapController = require("../controllers/mapController");
const upload = require("../middleware/upload_map");

router.get("/", mapController.getAllMaps);

router.get("/:image_hash", mapController.getMapByImageHash);

router.post("/", upload.array("files", 2), mapController.uploadMap);

router.put("/:image_hash", upload.array("files", 2), mapController.updateOneMap);

module.exports = router;
