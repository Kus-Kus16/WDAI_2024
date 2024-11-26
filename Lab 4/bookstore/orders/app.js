const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./orderRoutes');
const sequelize = require('../database/database');

const app = express();
const port = 3002;

// JSON parser
app.use(bodyParser.json());

// Main endpoint
app.get('/', (req, res) => {
    res.send('Order service');
});

app.use('/api/orders', orderRoutes);

sequelize.sync({force: false})
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Order service running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Database sync error:', error);
    });