const router = require('express').Router();
const { User, Post } = require('../models')
const { isLoggedIn, isAuthenticated, authenticate } = require('../utils');

router.post('/post', isAuthenticated, authenticate, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    const user = await User.findByPk(req.session.user);
    req.user = user;
    // await req.user.addPost(post);

    res.redirect('/');
  } catch (error) {
    if (error.errors && Array.isArray(error.errors)) {
      req.session.errors = error.errors.map(errObj => errObj.message);
    } else {
      console.error(error);
      req.session.errors = ['It was a mimic try again'];
    }
    res.redirect('/dashboard');
  }
});

module.exports = router;