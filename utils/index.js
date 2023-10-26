const User = require('../models/User');

function isLoggedIn(req, res, next) {
  if (req.session.user_id) {
    return res.redirect('/');
  }

  next();
}


function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
}

async function authenticate(req, res, next) {
    const user_id = req.session.user_id;
  
    if (user_id) {
      try {
        const user = await User.findByPk(req.session.user_id);
        if (user) {
          req.user = user.get({ plain: true });
        } else {
          // User not found, clear session and redirect to login page
          req.session.destroy((err) => {
            if (err) {
              console.error('Error destroying session:', err);
            }
            res.redirect('/login');
          });
          return;
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        res.redirect('/login');
        return;
      }
    }
  
    next();
  }

module.exports = { isLoggedIn, isAuthenticated, authenticate }