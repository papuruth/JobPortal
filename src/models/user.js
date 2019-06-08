const mongoose = require('mongoose')

const UserSchema = mongoose.Schema

const userData = new UserSchema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  userStatus: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Users', userData)
