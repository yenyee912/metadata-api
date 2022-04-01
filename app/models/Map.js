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
    // required: true,
    type: String,
  },
  property_privacy: {
    // required: true,
    type: String,
  },
  json_server_url: {
    // required: true,
    type: String,
  },
  tmx_server_url: {
    // auto downloadble content
    // required: true,
    type: String,
  },
  ipfs_url: {
    // required: true,
    type: String,
  },
  metadata: [metadataSchema],
  file_name: [
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
});

module.exports = mongoose.model("map", MapSchema, "map");
