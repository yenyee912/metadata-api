const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//metadata or attributes
const metadataSchema = new Schema({
  trait_type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const MapSchema = new Schema({
  contract_address: {
    required: true,
    type: String,
  },
  token_id: {
    required: true,
    type: String,
  },
  property_privacy: {
    required: true,
    type: String,
  },
  ipfs_url: {
    required: true,
    type: String,
  },
  metadata: [metadataSchema],
  file_name: [ //.tmx file first, then followed by .json files
    {
      required: true,
      type: String,
    },
  ],
  file_path: [
    {
      required: true,
      type: String,
    },
  ],
  created_at: {
    default: Date(),
    type: Date,
  },
  image_hash: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("map", MapSchema, "map");
