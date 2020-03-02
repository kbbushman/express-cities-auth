const db = require('../models');


// POST Register - User Create
const register = (req, res) => {
  // Verify req.body Is Not Empty

  // Query DB For Existing User By Email

  // If foundUser, Respond with 400

  // If No foundUser, Generate Salt and Hash User Password

  // Replace newUser Plain Text Password with Hased Password

  // Create newUser and Respond with 200

  db.User.create(req.body, (err, newUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    res.json(newUser);
  });
};


// POST Session Create
const login = (req, res) => {
  // Verify req.body Is Not Empty

  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});

    // If No User Found, Respond with 400

    // Compare Password Sent Password and foundUser Password

    // If Passwords Match, Create Session and Respond with 200

    // If Passwords Do Not Match, Respond with 400

    res.json(foundUser);
  });
};


// DELETE Session Destroy
const logout = (req, res) => {
  // If There Is A Current Session, Destroy Session and Respond with 200

  // Otherwise, Do Nothing
  res.json({status: 200, message: 'Logout Route Sucess...'});
};




module.exports = {
  register,
  login,
  logout,
};
