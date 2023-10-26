const User = require('../models/User');

function isLoggedIn(req, res, next) {
    if (req.session.user_id) {
        return res.redirect('/')
    }

    next();
};

function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
      return res.redirect('/login');
    }
  
    next();
  }

async function authenticate(req, res, next) {
    const user_id_ = req.session.user_id;

    if(user_id_) {
        const user = await User.findByPk(req.session.user_id);

        req.user = user.get({ plain: true });
    }

    next();
}

module.exports = { isLoggedIn, isAuthenticated, authenticate }