const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './orders.db', 
    logging: false,
});

module.exports = sequelize;