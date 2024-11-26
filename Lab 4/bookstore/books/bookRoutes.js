const express = require('express');
const axios = require('axios');
const Book = require('./Book');

const router = express.Router();

const authenticateJWT = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'No token' });
    }

    try {
        const response = await axios.post(
            'http://localhost:3003/api/verify', 
            {},  
            {
                headers: {
                    Authorization: `Bearer ${token}`,  
                }
            }
        );

        if (response.data.userId) {
            req.userId = response.data.userId; 
            next();  
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Token verification error' });
    }
};


router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Could not get books' });
    }
});

router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findByPk(bookId);

        if (book) {
            res.json(book);            
        } else {
            res.status(404).json({ error: 'Book not found' });            
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not get book' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {
    const { title, author, year } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });        
    }

    try {
        const book = await Book.create({ title, author, year });
        res.status(201).json({bookId: book.bookId});
    } catch (error) {
        res.status(500).json({ error: 'Could not add book' });
    }
});

router.delete('/:bookId', authenticateJWT, async (req, res) => {
    const { bookId } = req.params;

    try {
        const result = await Book.destroy({where: {bookId}});
        
        if (result) {
            res.json({ message: 'Book deleted'});            
        } else {
            res.status(404).json({ error: 'Book not found' });            
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete book' });
    }
});

module.exports = router;