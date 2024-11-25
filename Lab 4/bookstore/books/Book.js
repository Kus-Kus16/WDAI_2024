const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Book = sequelize.define('Book', {
    bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
    },
    year: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false, 
});

module.exports = Book;
