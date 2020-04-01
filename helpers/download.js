import https from 'https';
import fs from 'fs';

const download = (filename, url) => {
  const dest = `./client/src/images/${filename}`;
  const writer = fs.createWriteStream(dest);

  https
    .get(url, (response) => {
      response.pipe(writer);
    })
    .on('error', (err) => {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      return err.message;
    });

  return new Promise((resolve, reject) => {
    writer.on('finish', () => {
      writer.close();
      resolve(dest);
    });
    writer.on('error', (err) => reject(err.message));
  });
};

export default download;
