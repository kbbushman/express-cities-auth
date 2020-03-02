const express = require('express');
// DONT FORGET TO INVOKE ROUTER()
const router = express.Router();


// DONT FORGET TO CHANGE APP TO ROUTER


// Cities Index Template
router.get('/', (req, res) => {
  // Two Args: 1- Path to template, 2- root directory
  res.sendFile('views/index.html', {
    root: __dirname + '/../'
  });
});


// Cities New Template
router.get('/cities/new', (req, res) => {
  res.sendFile('views/cities/new.html', {
    root: __dirname + '/../',
  });
});


// Cities Show Template
router.get('/cities/:id', (req, res) => {
  res.sendFile('views/cities/show.html', {
    root: __dirname + '/../'
  });
});


// Register Template
router.get('/register', (req, res) => {

});


// Login Template
router.get('/login', (req, res) => {
 
});


// DONT FOREGET TO EXPORT THE ROUTER
module.exports = router;
