const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./bookRoutes');
const sequelize = require('../database/database');

const app = express();
const port = 3001;

// JSON parser
app.use(bodyParser.json());

// Main endpoint
app.get('/', (req, res) => {
    res.send('Book service');
});

app.use('/api/books', bookRoutes);

sequelize.sync({force: false})
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Book service running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database sync error:', error);
    });