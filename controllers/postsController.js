const db = require('../models');

const index = (req, res) => {
  db.Post.find({}, (err, allPosts) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(allPosts);
  });
};


const create = (req, res) => {
  req.body.user = '5e50591be93d252e5c217f25'; // Temp user association for testing

  // First create a Post, Then Associate it with a City
  db.Post.create(req.body, (err, newPost) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    // We use the City ID in the request params to find which City the Post should be embedded in
    db.City.findById(req.params.cityId, (err, foundCity) => {
      if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

      // Once we find the City, we can use the push() method to push the new Post into the Cities posts
      foundCity.posts.push(newPost);

      // Anytime a database document is altered, it must be saved
      foundCity.save((err, savedCity) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});


        res.json(newPost);
      });

    });
  });
};


const destroy = (req, res) => {
  // Find The City the Post Is Embedded In
  db.City.findById(req.params.cityId, (err, foundCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    // Mongoose id() method only works on arrays with embedded records
    // It takes the id of the sub document you want to find, and returns the whole object
    const postToDelete = foundCity.posts.id(req.params.postId);

    // If we do not find a record, do not continue past this point.
    // Respond back appropriately
    if (!postToDelete) {
      return res.status(400).json({status: 400, error: 'Could not find post'});
    }

    // If we make it past the "if" stattement above, we found the document to be deleted
    // The remove method will delete that object from the array
    postToDelete.remove();

    // By deleting the "postToDelete", we have altered the "foundCity" record
    // Use the Mongoose save() method to save the altered "foundCity" record
    foundCity.save((err, savedCity) => {
      if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

      // Now we need to delete the original Post from the Post collection
      db.Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
        res.json(deletedPost);
      });
    });
  })
};


module.exports = {
  index,
  create,
  destroy,
};
