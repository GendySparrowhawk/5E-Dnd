const router = require('express').Router();
const { User, Post, Comment } = require('../models')

const { isLoggedIn, isAuthenticated, authenticate } = require('../utils');

router.get('/', authenticate, async (req, res) => {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: 'author'
      }
    });
  
    res.render('landing', {
      user: req.user,
      posts: posts.map(p => p.get({ plain: true }))
    });
  });
  

module.exports = router;