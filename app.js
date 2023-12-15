require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const db = require('./models'); 

const app = express();
const PORT = process.env.PORT || 3000;
const apiRoutes = require('./controllers/api');
const homeRoutes = require('./controllers/homeRoutes');

app.set('views', path.join(__dirname, 'views'));


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session
app.use(session({
    secret: 'mortkey', 
    resave: false,
    saveUninitialized: true,
}));

//handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//define routes
app.use('/api', apiRoutes);
app.use('/', homeRoutes);

//sync Sequelize and begin the server
db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});