const request = require('request');
const fs = require('fs');

module.exports = (filename, uri, cb) => {
  const destination = `./client/src/images/${filename}.jpg`;
  request(uri)
    .pipe(fs.createWriteStream(destination))
    .on('error', (err) => {
      cb(err);
    })
    .on('close', () => {
      cb(null, destination);
    });
};
