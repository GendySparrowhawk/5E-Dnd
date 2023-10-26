const express = require('express');
const db = require('./config/connection');
const path = require('path');
// call in express and our database connection
const { engine, exphbs } = require('express-handlebars');
const session = require('express-session');

// view routes
const userRoutes = require('./controllers/user-routes');
const viewRoutes = require('./controllers/view-routes');
const postRoutes = require('./controllers/post-routes');
// set port ot a env varibale to run on heroku
const PORT = process.env.PORT || 3333;


const methodOverride = require('method-override');
const app = express();
// proload our files to public
app.use(express.static('./public'));
// be able to send json through
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// call in ahndlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
// session set to 1hr timeout
app.use(session({
    secret: 'tieflingBard',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
// apparently gotta make usr emethod overide is here to hadnel route mehtods in html
app.use(methodOverride('_method'));
app.use('/', [viewRoutes, postRoutes]);
app.use('/auth', userRoutes);
// snc database and start the server
db.sync({ force: false })
.then(() => {
    app.listen(PORT, () => console.log(`happy surfing on port ${PORT}`));
});