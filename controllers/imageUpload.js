import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { format } from 'util';
import { Storage } from '@google-cloud/storage';
import Download from '../helpers/download';

export default class ImageController {
  /**
   * Upload the image file to Google Storage
   * @param {File} file object that will be uploaded to Google Storage
   */
  static uploadImageToStorage = (file, filename, bucket) => {
    return new Promise((resolve, reject) => {
      const fileUpload = bucket.file(filename);
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
      blobStream.on('error', (error) => {
        reject(error);
      });
      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const url = format(
          `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`
        );
        fs.unlinkSync(path.resolve('client', 'src', 'images/firebase-key.json'));
        resolve(url);
      });
      blobStream.end(file.buffer);
    });
  };

  static upload = async (req, res) => {
    try {
      const fileName = 'firebase-key.json';
      const fileUrl = 'https://firebasestorage.googleapis.com/v0/b/job-portal-mern.appspot.com/o/firebase_key.json?alt=media';
      const keyFileName = await Download(fileName,fileUrl)
      console.log(keyFileName)
      const gcs = new Storage({
        projectId: 'job-portal-mern',
        keyFilename: path.resolve('client', 'src', 'images/firebase-key.json')
      });
      const bucketName = 'job-portal-mern.appspot.com';

      const bucket = gcs.bucket(bucketName);
      // ===== Multer storage
      const storage = multer.memoryStorage({
        destination: './client/src/images',
        limits: {
          fileSize: 10 * 1024 * 1024 // no larger than 5mb
        }
      });

      // ===== Upload image function
      const uploadImage = multer({
        storage
      }).single('file');

      uploadImage(req, res, (err) => {
        if (!err) {
          const { file } = req;
          const filename = req.body.filename + path.extname(file.originalname);
          console.log(filename);
          if (file) {
            this.uploadImageToStorage(file, filename, bucket)
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
}
