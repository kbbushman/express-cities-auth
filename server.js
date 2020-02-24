// SERVER SIDE JAVSCRIPT (Node.js with Express.js)

// Core Node Modules
// 3rd Party NPM Modules
// Custom Modules
// Variables

const express = require('express'); // The write less, do more library for Node
const bodyParser = require('body-parser'); // Parses data out of the request object and puts it in the "body" property
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
  db.City.findById(req.params.id, (err, foundCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(foundCity);
  });
});

// POST City Create
app.post('/api/v1/cities', (req, res) => {
  console.log(req.body); // Without body-parser, body will be undefined

  db.City.create(req.body, (err, newCity) => {
    if (err) return res.json(err);

    res.json(newCity);
  });
});

// PUT City Update
app.put('/api/v1/cities/:id', (req, res) => {
  // res.sendStatus(200) // 200 = Success/OK

  db.City.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(updatedCity);
  });
});

// DELETE City Destroy
app.delete('/api/v1/cities/:id', (req, res) => {
  // res.sendStatus(200);

  db.City.findByIdAndDelete(req.params.id, (err, deletedCity) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(deletedCity);
  });
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
