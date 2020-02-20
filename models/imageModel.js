const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema;

const imageData = new ImageSchema({
  url: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('images', imageData);
