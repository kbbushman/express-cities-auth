const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const PostSchema = new Schema({});

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
