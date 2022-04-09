// first arg: set mdoel path, 2nd arg: collection SINGULAR NAME
// this is to share one model among collections
const Avatar = require("../models/Model")("avatar");

const path = require("path");
const fs = require("fs");

async function pushFiles(metadata, token_id, index) {
  let tempPath = metadata.path;
  let extension = path.extname(metadata.originalname);
  let date = Date.now();
  let targetPath = path.resolve(
    "./avatars/" + date + "-" + token_id + extension
  );
  let newPath = fs.rename(tempPath, targetPath, function (err) {
    // console.log(newPath);
  });
  let filename = `${date}-${token_id}${extension}`;
  // let filename = `${token_id}${extension}`;
  let filepath = `/avatars/${date}-${token_id}${extension}`;

  return { file_name: filename, file_path: filepath };
}

// meaningless, just to test query
exports.getAllAvatar = async (req, res) => {
  try {
    const x = await Avatar.find();

    console.log(x);

    if (x) res.status(200).send({ data: x });
    else res.status(200).send({ msg: `No data.` });
  } catch (err) {
    res
      .status(500)
      .send({ msg: `Error while retrieving avatar(s): ${err.message}.` });
  }
};

exports.getAvatarByImageHash = async (req, res) => {
  try {
    const x = await Avatar.find(req.params);

    if (x) res.status(200).send({ data: x });
    else
      res
        .status(200)
        .send({ msg: `No data with image hash= ${req.query.params}.` });
  } catch (err) {
    res
      .status(500)
      .send({ msg: `Error while retrieving avatar(s): ${err.message}.` });
  }
};

exports.uploadAvatar = async (req, res) => {
  let token_id = req.body.token_id;

  const avatar = await Avatar.findOne({ token_id: token_id });

  if (avatar) {
    res.status(200).send({ msg: `Avatar existed.` });
    return;
  }

  try {
    if (req.file) {
      let filesRecord = new Avatar({
        contract_address: req.body.contract_address,
        attributes: req.body.attributes,
        token_id: token_id,
        image_hash: req.body.image_hash,
        ipfs_url: req.body.ipfs_url,
        property_privacy: req.body.property_privacy,
        file_name: "",
        file_path: "",
      });

      let imageData = await pushFiles(req.file, filesRecord.token_id);
      filesRecord.file_path = imageData.filePath;
      filesRecord.file_name = imageData.fileName;

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
            .send({ msg: `Unable to upload file. Please try again.` });
      } catch (err) {
        res
          .status(500)
          .send({ msg: `Error while uploading file: ${err.message}.` });
      }
    } else {
      res.status(200).send({ msg: `No data.` });
    }
  } catch (err) {
    res
      .status(500)
      .send({ msg: `Error while uploading avatar: ${err.message}.` });
  }
};
