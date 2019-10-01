const path = require('path');
const multer = require('multer');
const { format } = require('util')
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "job-portal-mern",
    keyFilename: "./config/firebase_key.json"
});

const bucketName = "job-portal-mern.appspot.com";

const bucket = storage.bucket(bucketName);

exports.upload = function (req, res) {
    try {
        const storage = multer.memoryStorage({
            destination: "./client/src/images",
            limits: {
                fileSize: 10 * 1024 * 1024 // no larger than 5mb
            },
            filename: function (req, file, cb) {
                cb(null, req.body.filename + path.extname(file.originalname));
            }

        });

        const upload = multer({
            storage: storage
        }).single('file');

        upload(req, res, (err) => {
            if (!err) {
                let file = req.file;
                let filename = req.body.filename + path.extname(file.originalname);
                if (file) {
                    uploadImageToStorage(file, filename)
                        .then((url) => {
                            return res.send(filename)
                        }).catch((error) => {
                            console.log(error.message);
                            throw new Error(error)
                        });
                }
                // 
            } else {
                throw new Error(err)
            }
        });
    } catch (error) {
        res.send(error.message)
    }
}

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file, filename) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
       
        let fileUpload = bucket.file(filename);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },

        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`);
            resolve(url);
        });

        blobStream.end(file.buffer);
    });
}
