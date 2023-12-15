require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const db = require('./models'); 

const app = express();
const PORT = process.env.PORT || 3000;
const apiRoutes = require('./controllers/api');
const withAuth = require('./middleware/auth');

app.use('/api', apiRoutes);
app.use('/', homeRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
