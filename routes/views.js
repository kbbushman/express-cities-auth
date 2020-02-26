const express = require('express');
// DONT FORGET TO INVOKE ROUTER()
const router = express.Router();

// DONT FORGET TO CHANGE APP TO ROUTER
router.get('/', (req, res) => {
  // Two Args: 1- Path to template, 2- root directory
  res.sendFile('views/index.html', {
    root: __dirname + '/../'
  });
});



// '/cities/new'
router.get('/cities/new', (req, res) => {
  res.sendFile('views/cities/new.html', {
    root: __dirname + '/../',
  });
});

router.get('/cities/:id', (req, res) => {
  res.sendFile('views/cities/show.html', {
    root: __dirname + '/../'
  });
});


// DONT FOREGET TO EXPORT THE ROUTER
module.exports = router;
