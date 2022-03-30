const Map2 = require("../models/Map");

exports.getAllMaps = async (req, res) => {
  try {  
    const x = await Map2.find()

    console.log(x)

    if (x)
      res.status(200).send({ data: x });
    else
      res.status(200).send({ msg: `No data.` });
  }

  catch (err) {
    res.status(500).send({ msg: `Error while retrieving map(s): ${err.message}.`, });
  }
};



