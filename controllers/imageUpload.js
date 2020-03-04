const path = require('path');
const multer = require('multer');
const { format } = require('util');
const { Storage } = require('@google-cloud/storage');

const gcs = new Storage({
  projectId: 'job-portal-mern',
  keyFilename: './config/firebase_key.json',
});

const bucketName = 'job-portal-mern.appspot.com';

const bucket = gcs.bucket(bucketName);
/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file, filename) => new Promise((resolve, reject) => {
  const fileUpload = bucket.file(filename);

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

exports.upload = function upload(req, res) {
  try {
    const storage = multer.memoryStorage({
      destination: './client/src/images',
      limits: {
        fileSize: 10 * 1024 * 1024, // no larger than 5mb
      },
    });

    const uploadImage = multer({
      storage,
    }).single('file');

    uploadImage(req, res, (err) => {
      if (!err) {
        const { file } = req;
        const filename = req.body.filename + path.extname(file.originalname);
        console.log(filename)
        if (file) {
          uploadImageToStorage(file, filename)
            .then(() => res.send(filename))
            .catch((error) => {
              throw new Error(error);
            });
        }
        //
      } else {
        throw new Error(err);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};
