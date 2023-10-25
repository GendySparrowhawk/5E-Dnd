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
  
  router.get('/register', (req, res) => {
    // Render the register form template
    res.render('register', {
      errors: req.session.errors,
      user: req.user
    })
  
    req.session.errors = [];
  });


  router.get('/login', (req, res) => {
    // Render the login form template
    res.render('login', {
      errors: req.session.errors,
      user: req.user,
    });
  
    req.session.errors = [];
  });

  router.get('/dashboard', authenticate, async (req, res) => {

    const posts = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          attributes: [
            'id',
            [literal("substring(text, 1, 150)"), 'text'],
            'date'
          ]
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 10
  });

  

  res.render('profile', {
    errors: req.session.errors,
    user: req.user,
    posts: posts.map(r => r.get({ plain: true })),
  });

});
module.exports = router;