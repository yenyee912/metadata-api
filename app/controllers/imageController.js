const Image = require("../models/Image");
const path = require('path');
const fs = require('fs');

async function pushImages(metadata, contractAdd) {

    let tempPath = metadata.path
    let extension = path.extname(metadata.originalname)
    let targetPath = path.resolve('./images/' + contractAdd + extension)
    let newPath = fs.rename(tempPath, targetPath, function (err) {
        // console.log("new path: " + targetPath)
    })
    let filename = `${contractAdd}${extension}`;

    let filepath = `/images/${contractAdd}${extension}`;
    // console.log("filepath: " +  filepath)
    return { fileName: filename, filePath: filepath}

}

exports.uploadImages = async (req, res) => {
    console.log(req.body.metadata[0])
    var metadata = req.body.metadata
    // x= JSON.stringify(x)

    console.log(req.file)

    let contractAddress = req.body.contractAddress

    try {
        if (req.file) {
            let imageRecord = new Image({
                contractAddress: contractAddress,
                metadata:metadata
            })

            // console.log(imageRecord)
            let imageData = await pushImages(req.file, imageRecord.contractAddress )
            
            imageRecord.filePath = imageData.filePath
            imageRecord.fileName = imageData.fileName
            
            const x = await imageRecord.save()

            try {
                if (x)
                    res.status(201).send({
                        msg: `Successfully upload image.`,
                        data: x
                    });

                else
                    res.status(304).send({ msg: `Unable to upload image. Please try again.` })
            }

            catch (err) {
                res.status(500).send({ msg: `Error while uploading image: ${err.message}.` });
            }
        }

        else {
            res.status(200).send({ msg: `No data.` })
        }
    }

    catch (err) {
        res.status(500).send({ msg: `Error while uploading image(s): ${err.message}.` });
    }
};


exports.getImageByContractAddress = async (req, res, next) => {
    let contractAddress = req.body.contractAddress
    console.log(req.body)
    const x = await Image.findOne({ contractAddress: contractAddress }).sort({_id: -1})

    try{
        if (x)
            res.status(200).send({ data: x });
        else
            res.status(200).send({ msg: `No data.` });

    }

    catch(err){
        res.status(500).send({ msg: `Error while retrieving image(s): ${err.message}.`, });

    }
};


// exports.deleteImageByContractAddress = async (req, res, next) => {
//     let contractAdd = req.contractAdd

//     const x = await Image.deleteMany({ DO: contractAdd })

//     try {
//         if (x.n > 0)
//             res.status(200).send({ msg: `Successfully delete ${x.n} image(s) record.` })

//         else
//             res.status(304).send({ msg: `Unable to delete image(s) record. Please try again.` })

//     }

//     catch (err) {
//         res.status(500).send({ msg: `Error while deleting image(s) with DO= ${contractAdd}: ${err.message}.`, });
//     }
// };

exports.getOneImageByDO = async (req, res, next) => {
    let fileName= req.params.fileName

    const x = await Image.findOne({ contractAddress: req.body.contractAddress, fileName: fileName }).sort({ _id: -1 })

    try {
        if (x){

            let imageObject = { 
                fileName: x.fileName,
                filePath: x.filePath
            }

            res.status(200).send({ data: imageObject });
        }
        else
            res.status(200).send({ msg: `No data.` });

    }

    catch (err) {
        res.status(500).send({ msg: `Error while retrieving image(s) with filename= ${fileName}: ${err.message}.`, });

    }
};


exports.deleteImageByDO = async (req, res, next) => {
    let contractAdd = req.contractAdd

    const x = await Image.deleteMany({ DO: contractAdd })

    try {
        if (x.n > 0)
            res.status(200).send({ msg: `Successfully delete ${x.n} image(s) record.` })

        else
            res.status(304).send({ msg: `Unable to delete image(s) record. Please try again.` })

    }

    catch (err) {
        res.status(500).send({ msg: `Error while deleting image(s) with DO= ${contractAdd}: ${err.message}.`, });
    }
};


