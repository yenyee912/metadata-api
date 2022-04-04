const Map2 = require("../models/Map");

const path = require("path");
const fs = require("fs");

async function pushFiles(metadata, token_id, index) {
  let tempPath = metadata.path;
  let extension = path.extname(metadata.originalname);
  // let targetPath = path.resolve("./maps/" + index + "-" + token_id + extension);
  let date = Date.now();
  let targetPath = path.resolve("./maps/" + date + "-" + token_id + extension);
  let newPath = fs.rename(tempPath, targetPath, function (err) {
    // console.log(newPath);
  });
  let filename = `${date}-${token_id}${extension}`;
  // let filename = `${token_id}${extension}`;
  let filepath = `/maps/${date}-${token_id}${extension}`;

  return { file_name: filename, file_path: filepath };
}

exports.getAllMaps = async (req, res) => {
  try {
    const x = await Map2.find();

    console.log(x);

    if (x) res.status(200).send({ data: x });
    else res.status(200).send({ msg: `No data.` });
  } catch (err) {
    res
      .status(500)
      .send({ msg: `Error while retrieving map(s): ${err.message}.` });
  }
};

exports.uploadMap = async (req, res) => {
  let token_id = req.body.token_id;
  const map = await Map2.findOne({ token_id: token_id });

  if (map) {
    res.status(200).send({ msg: `Map existed.` });
    return;
  }

  try {
    if (req.files) {
      let filesRecord = new Map2({
        contract_address: req.body.contract_address,
        metadata: req.body.metadata,
        token_id: token_id,
        ipfs_url: req.body.ipfs_url,
        property_privacy: req.body.property_privacy,
        file_name: [],
        file_path: [],
      });

      for (let i = 0; i < req.files.length; i++) {
        let index = parseInt(i + 1);
        let mapData = await pushFiles(
          req.files[i],
          filesRecord.token_id,
          index
        );
        filesRecord.file_path.push(mapData.file_path);
        filesRecord.file_name.push(mapData.file_name);
      }

      const output = await filesRecord.save();

      try {
        if (output)
          res.status(201).send({
            msg: `Successfully upload files.`,
            data: output,
          });
        else
          res
            .status(304)
            .send({ msg: `Unable to upload files. Please try again.` });
      } catch (err) {
        res
          .status(500)
          .send({ msg: `Error while uploading files: ${err.message}.` });
      }
    } else {
      res.status(200).send({ msg: `No data.` });
    }
  } catch (err) {
    res
      .status(500)
      .send({ msg: `Error while uploading files(s): ${err.message}.` });
  }
};

exports.updateOneMap = async (req, res) => {
  let token_id = req.body.token_id;

  if (req.files) {
    let filesRecord = {
      contract_address: req.body.contract_address,
      metadata: req.body.metadata,
      token_id: token_id,
      ipfs_url: req.body.ipfs_url,
      property_privacy: req.body.property_privacy,
      file_name: [],
      file_path: [],
    };

    for (let i = 0; i < req.files.length; i++) {
      let index = parseInt(i + 1);
      let mapData = await pushFiles(req.files[i], filesRecord.token_id, index);
      filesRecord.file_path.push(mapData.file_path);
      filesRecord.file_name.push(mapData.file_name);
    }

    try {
      const x = await Map2.findOneAndUpdate(
        { token_id: { $eq: token_id } },
        filesRecord,
        {
          upsert: false,
          useFindAndModify: false,
          returnOriginal: false,
        }
      );
      if (x) {
        res.status(201).send({
          msg: `Successfully update map.`,
          data: x,
        });
      } else {
        res.status(200).send({
          msg: `Unable to update seed status. Please try again.`,
        });
      }
    } catch (err) {
      res.status(500).send({
        msg: `Error while updating seed status: ${err.message}.`,
      });
    }
  }
};
