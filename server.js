const express = require('express');
const db = require('./config/connection');

const { engine } = require('express-handlebars');
const session = require('express-session');

// view routes
const userRoutes = require('./controllers/user-routes');
const viewRoutes = require('./controllers/view-routes');
const postRoutes = require('./controllers/post-routes');

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('.hbs', engine({ extended: '.hbs'}));
app.set('view engine', '.hbs');

app.use(session({
    secret: 'tieflingBard',
    resave: false,
    saveUninitialized: true
}));
app.use('/', [viewRoutes, postRoutes]);
app.use('/auth', userRoutes);

db.sync({ force: false })
.then(() => {
    app.listen(PORT, () => console.log(`happy surfing on port ${PORT}`));
});