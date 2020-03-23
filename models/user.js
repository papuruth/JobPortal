const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema;

mongoose.promise = Promise;

// Define userSchema
const userSchema = new UserSchema({
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
    required: false,
    minlength: 8
  },
  userStatus: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  role: {
    type: Number,
    required: true
  },
  google: {
    googleId: { type: String, required: false }
  }
});

// Define schema methods
userSchema.methods = {
  checkPassword: function checkPassword(inputPassword){
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: function hashPassword(plainTextPassword){
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
userSchema.pre('save', (next) => {
  if (!this.password) {
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

// Create reference to User & export
const User = mongoose.model('User', userSchema);
module.exports = User;
