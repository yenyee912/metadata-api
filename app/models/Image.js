const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    contractAddress: {
        // required: true,
        type: Number,
    },
    description: {
        // required: true,
        type: String,
    },
    // for multiple uploads
    fileName: {
        required: true,
        type: String,
    },
    filePath: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

module.exports = mongoose.model('image', ImageSchema, 'images');