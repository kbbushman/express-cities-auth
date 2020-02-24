const db = require('../models');

const index = (req, res) => {
  // We access our datbase through the db variable
  db.City.find({})
    .populate('posts.user', 'firstName lastName _id')
    .exec((err, foundCities) => {
      if (err) return res.json(err);
  
      res.json(foundCities);
    });
};

const show = (req, res) => {
  db.City.findById(req.params.id, (err, foundCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(foundCity);
  });
};



// POST City Create
const create = (req, res) => {
  console.log(req.body); // Without body-parser, body will be undefined

  db.City.create(req.body, (err, newCity) => {
    if (err) return res.json(err);

    res.json(newCity);
  });
};


// PUT City Update
const update = (req, res) => {
  // res.sendStatus(200) // 200 = Success/OK

  db.City.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(updatedCity);
  });
};

// DELETE City Destroy
const destroy = (req, res) => {
  // res.sendStatus(200);

  db.City.findByIdAndDelete(req.params.id, (err, deletedCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(deletedCity);
  });
};


module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
