const User = require('../models/User');
// this page is made to handle authentication functions
function isLoggedIn(req, res, next) {
  if (req.session.user_id) {
    return res.redirect('/');
  }
// when you log in kick you to landing page
  next();
}


function isAuthenticated(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
// if no session detected kick to login screen
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