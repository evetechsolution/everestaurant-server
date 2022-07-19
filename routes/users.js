const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/users/
router.get('/', async (req, res) => {
    try {
        const listofData = await User.find().sort({"name": 1});
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/create/
router.post('/create', async (req, res) => {
    try {
        const data = new User(req.body);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await User.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/users/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await User.updateOne(
            { _id: req.params.id },
            {
                $set: req.body
            }
        );
        res.json(updatedData);
    } catch (err) {
        res.json({ message: err });
    }
});

// DELETE A SPECIFIC DATA
// DELETE http://localhost:5000/api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await User.remove({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;