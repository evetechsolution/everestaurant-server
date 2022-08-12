const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const User = require('../models/user');

// POST LOGIN
// POST http://localhost:5000/api/auth/login
router.post('/login', async (req, res) => {
    try {
        // Chek user
        const userExist = await User.findOne({ username: req.body.username });
        if (!userExist) return res.status(400).json({ message: 'User is not found' });
        if (!userExist.isActive) return res.status(400).json({ message: 'User is not active' });

        const validPassword = await bcrypt.compareSync(req.body.password, userExist.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        // Create and asign a token
        const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET, { expiresIn: '5 days' });
        res.json({ accessToken: token, user: userExist });
    } catch (err) {
        res.json({ message: err });
    }
});

// GET VERIFY
// GET http://localhost:5000/api/auth/my-account
router.get('/my-account', verify, async (req, res) => {
    try {
        // Chek user
        const userExist = await User.findOne({ _id: req.userId });
        res.json({ user: userExist });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;