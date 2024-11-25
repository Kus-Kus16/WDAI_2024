const express = require('express');
const Book = require('./Book');

const router = express.Router();

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

router.post('/', async (req, res) => {
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

router.delete('/:bookId', async (req, res) => {
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