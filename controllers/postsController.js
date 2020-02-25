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



module.exports = {
  index,
  create,
}
