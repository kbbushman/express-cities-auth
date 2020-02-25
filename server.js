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
const db = require('./models'); // DB Models & Modules

// Init Routes
const routes = require('./routes'); // Routes Module

// ------------------- MIDDLEWARE

// Serve Public Assets
app.use(express.static(__dirname + '/public'));

// Init BodyParser
app.use(bodyParser.json());

// Custom Request Logger Middleware
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;

  // Destructuring
  // const { url, method } = req;

  const requestedAt = new Date().toLocaleTimeString();

  const result = `${method} ${url} ${requestedAt}`;

  console.log(result);

  next();
});

// ------------------- VIEW ROUTES
// Use() is all methods (GET, PUT, POST, DELTE, etc);
app.use('/', routes.views);

// ------------------- API ROUTES

app.use('/api/v1', routes.api);

// API Error 404
app.use('/api/*', (req, res) => {
  res.status(404).json({status: 404, error: 'Error 404: Resource not found'});
});

// HTML Error 404
app.use('*', (req, res) => {
  res.send('<h2>Error 404: Not Found</h2>');
});

// ------------------ START SERVER

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
