const path = require('path')
// const Busboy = require('busboy');
// const fs = require('fs')
var multer = require('multer')


exports.upload = function (req, res) {
    const storage = multer.diskStorage({
        destination: "./src/images",
        filename: function (req, file, cb) {
            cb(null, req.body.filename + path.extname(file.originalname));
        }
    
    });
    
    const upload = multer({
        storage: storage
    }).single('file');

    upload(req, res, (err) => {
        console.log("Request file ---", req.file.filename);//Here you get file.
        /*Now do where ever you want to do*/
        if(!err) {
            return res.send(req.file.filename)
        }
     });
}