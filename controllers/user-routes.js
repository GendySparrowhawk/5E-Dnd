const router = require('express').Router();
const User = require('../models/User');

// to the register page
router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.create(req.body);
  
      req.session.user_id = user.id;
      // grabs user id from session
      res.redirect('/');
  
    } catch (err) {
      console.log(err);
      res.redirect('/register');
    }
  });
  // to login page
  router.post('/login', async (req, res) => {
    const user = await User.findOne({
      where: {
        user_name: req.body.user_name
      }
    });
    // validate
    if (!user) {
      req.session.errors = ['No user found with that user name'];
  
      return res.redirect('/login');
    }
    const passIsValid = await user.validatePass(req.body.password)
    // Check if password is Invalid
    if (!passIsValid) {
      req.session.errors = ['Password is incorrect.']
      return res.redirect('/login');
    }
    req.session.user_id = user.id;
    res.redirect('/');
  });
  // logout!
  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  })
  
  module.exports = router;