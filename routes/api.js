const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const db = require('../models');

// Path starts at 'api/v1'

// GET Cities Index
router.get('/cities', ctrl.cities.index);
router.get('/cities/:id', ctrl.cities.show);
router.post('/cities', ctrl.cities.create);
router.put('/cities/:id', ctrl.cities.update);
router.delete('/cities/:id', ctrl.cities.destroy);


// -------- Post Routes

// GET Posts Index
router.get('/api/v1/posts', ctrl.posts.index);

// POST Posts Create
router.post('/api/v1/cities/:cityId/posts', (req, res) => {
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
});


// -------- User Routes

// GET Users Index
router.get('/api/v1/users', (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(allUsers);
  });
});


// POST Users Create
router.post('/api/v1/users', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(newUser);
  });
});


module.exports = router;
