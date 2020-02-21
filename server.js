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

// GET Cities Index
app.get('/api/v1/cities', (req, res) => {
  // We access our datbase through the db variable
  db.City.find({}, (err, foundCities) => {
    if (err) return res.json(err);

    res.json(foundCities);
  });
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

// Error 404
app.use('*', (req, res) => {
  res.send('<h2>Error 404: Not Found</h2>');
});

// ------------------ START SERVER

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
