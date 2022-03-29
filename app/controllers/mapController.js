const Map = require("../models/Map");
const path = require('path');

exports.getAllMaps = async (req, res, next) => {
  try {  
    const x = await Map.find().sort({ _id: -1 })

    if (x)
      res.status(200).send({ data: x });
    else
      res.status(200).send({ msg: `No data.` });
  }

  catch (err) {
    res.status(500).send({ msg: `Error while retrieving map(s): ${err.message}.`, });
  }
};



