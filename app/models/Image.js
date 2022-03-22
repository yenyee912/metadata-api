const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//metadata or attributes
const metadataSchema = new Schema({
    trait_type: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

const ImageSchema = new Schema({
    contractAddress: {
        required: true,
        type: Number,
    },
    metadata: [metadataSchema],
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