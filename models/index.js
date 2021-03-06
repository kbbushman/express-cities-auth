const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-cities';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connnected successfully...'))
  .catch((err) => console.log(err));

  module.exports = {
    City: require('./City.js'),
    Post: require('./Post'), // ALL FILES ARE ASSUMED TO BE JS UNLESS OTHERWISE STATED
    User: require('./User'),
  };
