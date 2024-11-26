const express = require('express');
const axios = require('axios');
const Order = require('./Order');

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


async function isBookAvailable(bookId) {
    try {
        const response = await axios.get(`http://localhost:3001/api/books/${bookId}`); 
        return response.status === 200; 
    } catch (error) {
        return false; 
    }
}

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.findAll({where: {userId}});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Could not get orders' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {  
    const { userId, bookId, quantity } = req.body;

    if (!userId || !bookId || !quantity || quantity < 1) {
        return res.status(400).json({ error: 'Values missing' });
    }

    const bookExists = await isBookAvailable(bookId);
    if (!bookExists) {
        return res.status(404).json({ error: 'Book not found' });
    }

    try {
        const order = await Order.create({ userId, bookId, quantity });
        res.status(201).json({orderId: order.orderId});
    } catch (error) {
        res.status(500).json({ error: 'Could not add order' });
    }
});

router.delete('/:orderId', authenticateJWT, async (req, res) => {
    const { orderId } = req.params;

    try {
        const result = await Order.destroy({where: {orderId}});

        if (result) {
            res.json({ message: 'Order deleted'});            
        } else {
            res.status(404).json({ error: 'Order not found' });            
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not delete order' });
    }
});

router.patch('/:orderId', authenticateJWT, async (req, res) => {
    const { orderId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'New quantity missing' });
    }

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.quantity = quantity;
        await order.save();
        res.json({ message: 'Order updated', order });
    } catch (error) {
        res.status(500).json({ error: 'Could not update order' });
    }
});

module.exports = router;