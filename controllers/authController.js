const bcrypt = require('bcryptjs');
const db = require('../models');


// POST Register - User Create
const register = (req, res) => {
  // Verify req.body Is Not Empty

  // Query DB For Existing User By Email

  // If foundUser, Respond with 400

  // If No foundUser, Generate Salt and Hash User Password

  // Replace newUser Plain Text Password with Hased Password

  // Create newUser and Respond with 200

  // if (!req.body.email === '' || !req.body.password === '')

  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

    if (foundUser) {
      return res.status(400).json({status: 400, message: 'Account already registerd, please login'});
    }

    // Encrypt User Password
    // First, generate a salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

        const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        }

        db.User.create(userData, (err, newUser) => {
          if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

          res.status(201).json({status: 201, message: 'Success'});
        });
      });
    });
  });
};


// POST Session Create
const login = (req, res) => {
  // Verify req.body Is Not Empty

  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    // If No User Found, Respond with 400
    if (!foundUser) {
      return res.status(400).json({status: 400, message: 'Invalid credentials'});
    }

    // Hash the req.body.password (supplied password)
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

      if (isMatch) {
        // Create a session and respond
        const currentUser = {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        };

        // Create a New Session (Key to the Kingdom)
        req.session.currentUser = currentUser;

        // Respond
        res.status(200).json({status: 200, user: currentUser});
      } else {
        // Respond with error
        res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
      }
    });
  });
};


// DELETE Session Destroy
const logout = (req, res) => {
  // If There Is A Current Session, Destroy Session and Respond with 200
  if (!req.session.currentUser) {
    return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
  }
  
  req.session.destroy((err) => {
    if (err) return res.status(400).json({status: 400, message: 'Something went wrong, please try again'});

    res.status(200).json({status: 200, message: 'Success'});
  });
};


const verify = (req, res) => {
  if (req.session.currentUser) {
    return res.json({
      status: 200,
      message: 'Authorized',
      currentUser: req.session.currentUser,
    });
  }

  res.status(401).json({status: 401, error: 'Unauthorized, please login and try again'});
};



module.exports = {
  register,
  login,
  logout,
  verify,
};
