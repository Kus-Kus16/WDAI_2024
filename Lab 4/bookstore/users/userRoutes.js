const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./User');

const router = express.Router();

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'SECRET_KEY'); 
        return { valid: true, userId: decoded.userId };  
    } catch (err) {
        return { valid: false, error: 'Invalid token' };
    }
};

router.post('/verify', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'No token' });
    }

    const result = verifyToken(token); 

    if (result.valid) {
        res.json({ userId: result.userId }); 
    } else {
        res.status(401).json({ error: result.error });
    }
});

router.post('/register', async (req, res) => {  
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json({ error: 'Values missing' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } })
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ userId: user.userId });
    } catch (error) {
        res.status(500).json({ error: 'Could not add user' });
    }
});

router.post('/login', async (req, res) => {  
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json({ error: 'Values missing' });
    }

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(400).json({ error: "User does not exist" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.userId, email: user.email }, 'SECRET_KEY');

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Could not log in' });
    }
});


module.exports = router;