const router = require('express').Router();
const { Op, literal } = require('sequelize');
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
        as: 'author'
      },
      {
        model: Comment,
        attributes: [
          'id',
          'text',
          'date'
        ],
        include: [
          {
            model: User,
            as: 'author'
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: 10
  });



  res.render('dashboard', {
    errors: req.session.errors,
    user: req.user,
    posts: posts.map(p => p.get({ plain: true })),
  });

});
module.exports = router;