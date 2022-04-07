var express = require("express");
var router = express.Router({ mergeParams: true });

var mapController = require("../controllers/mapController");
const upload = require("../middleware/upload_map");

router.get("/", mapController.getAllMaps);

router.get("/:contract_address", mapController.getMapByUserContract);

router.post("/", upload.array("files", 2), mapController.uploadMap);

router.put("/", upload.array("files", 2), mapController.updateOneMap);

module.exports = router;
