const https = require('https');
const fs = require('fs');

module.exports = (filename, url, cb) => {
  const dest = `./client/src/images/${filename}.jpg`;
  const file = fs.createWriteStream(dest);
  https
    .get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(cb(null, dest)); // close() is async, call cb after close completes.
      });
    })
    .on('error', (err) => {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message, null);
    });
};
