const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const sequelize = require('../database/database');

const app = express();
const port = 3003;

// JSON parser
app.use(bodyParser.json());

// Main endpoint
app.get('/', (req, res) => {
    res.send('User service');
});

app.use('/api', userRoutes);

sequelize.sync({force: false})
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`User service running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database sync error:', error);
    });