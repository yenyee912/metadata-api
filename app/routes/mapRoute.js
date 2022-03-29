var express = require('express');
var router = express.Router({mergeParams: true});

var mapController = require('../controllers/mapController');
const upload = require("../middleware/upload");

router.get('/', mapController.getAllMaps)

module.exports = router;