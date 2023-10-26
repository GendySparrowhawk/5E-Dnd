const router = require('express').Router();
const { User, Post } = require('../models')
const { isLoggedIn, isAuthenticated, authenticate } = require('../utils');

router.post('/post', isAuthenticated, authenticate, async (req, res) => {
    try {
      const post = await Post.create(req.body);
  
      await req.user.addPost(post);
  
      res.redirect('/');
    } catch (error) {
      req.session.errors = error.errors.map(errObj => errObj.message);
      res.redirect('/dashboard');
    }
  });

module.exports = router;