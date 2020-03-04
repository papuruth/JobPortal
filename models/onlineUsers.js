const mongoose = require('mongoose');

const onlineUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  disconnectTime: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('onlineUsers', onlineUserSchema);