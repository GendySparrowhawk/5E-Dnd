const router = require('express').Router();
const { Op, literal } = require('sequelize');
const { User, Post, Comment } = require('../models')
const { isLoggedIn, isAuthenticated, authenticate } = require('../utils');

router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author'
        },
        {
          model: Comment,
          as: 'post_comments',
          include: [
            {
              model: User,
              as: 'author'
            }
          ]
        }
      ],
      // just learned about this little guy after hours of trying to poulate comments
      // this returns modle instances instead of raw js objects. 
      raw: false
    });

    res.render('landing', {
      user: req.user,
      posts: posts.map(p => p.get({ plain: true }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching posts and comments');
  }
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
  console.log(req.session.user_id)
  const posts = await Post.findAll({
    where: {
    author_id: req.session.user_id
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