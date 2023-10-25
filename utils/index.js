const User = require('../models/User');

function isLoggedIn(req, res, next) {
    if (req.session.user_id) {
        return res.redirect('/')
    }

    next();
};

function isAuthenticaed(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }

    next();
};

async function authenticate(rea, res, next) {
    const user_id_ = req.session.user_id;

    if(user_id_) {
        const user = await User.findByPk(req.session.user_id);

        req.user = user.get({ plain: ture });
    }

    next();
}

module.exports = { isLoggedIn, isAuthenticaed, authenticate }