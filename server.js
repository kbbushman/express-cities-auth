// Core Node Modules
// 3rd Party NPM Modules
// Custom Modules
// Variables

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

// Init DB
const db = require('./models');

// ------------------- MIDDLEWARE

// Init BodyParser
app.use(bodyParser.json());

// ------------------- VIEW ROUTES

app.get('/', (req, res) => {
  res.send('<h1>Welcome To Express Cities</h1>');
});

// ------------------- API ROUTES

// -------- Cities Routes

// GET Cities Index
app.get('/api/v1/cities', (req, res) => {
  // We access our datbase through the db variable
  db.City.find({})
    .populate('posts.user', 'firstName lastName _id')
    .exec((err, foundCities) => {
      if (err) return res.json(err);
  
      res.json(foundCities);
    });
  // db.City.find({}, (err, foundCities) => {
  //   if (err) return res.json(err);

  //   res.json(foundCities);
  // });
});

// GET City Show
app.get('/api/v1/cities/:id', (req, res) => {
  const city = {name: 'San Francisco'};

  res.json(city);
});

// POST City Create
app.post('/api/v1/cities', (req, res) => {
  console.log(req.body);

  db.City.create(req.body, (err, newCity) => {
    if (err) return res.json(err);

    res.json(newCity);
  });
});

// PUT City Update
app.put('/api/v1/cities/:id', (req, res) => {
  res.sendStatus(200) // 200 = Success/OK
});

// DELETE City Destroy
app.delete('/api/v1/cities/:id', (req, res) => {
  res.sendStatus(200);
});


// -------- Post Routes

// GET Posts Index
app.get('/api/v1/posts', (req, res) => {
  db.Post.find({}, (err, allPosts) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(allPosts);
  });
});


// POST Posts Create
app.post('/api/v1/cities/:cityId/posts', (req, res) => {
  req.body.user = '5e50591be93d252e5c217f25';
  db.Post.create(req.body, (err, newPost) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    db.City.findById(req.params.cityId, (err, foundCity) => {
      if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

      foundCity.posts.push(newPost);

      foundCity.save((err, savedCity) => {
        if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});


        res.json(newPost);
      });


    })
  });
});


// -------- User Routes

// GET Users Index
app.get('/api/v1/users', (req, res) => {
  db.User.find({}, (err, allUsers) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(allUsers);
  });
});


// POST Users Create
app.post('/api/v1/users', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(newUser);
  });
});

// Error 404
app.use('*', (req, res) => {
  res.send('<h2>Error 404: Not Found</h2>');
});

// ------------------ START SERVER

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
