const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: String,
  email: String,
  password: String,
}, {timestamps: true});

// const User = mongoose.model('User', UserSchema);
// module.exports = User;

module.exports = mongoose.model('User', UserSchema);
