const express = require('express');
const router = express.Router();
const Bar = require('../models/bar');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/bars/
router.get('/', async (req, res) => {
    try {
        const listofData = await Bar.find();
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/bars/create
router.post('/create', async (req, res) => {
    try {
        const data = new Bar(req.body);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/bars/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Bar.find({ id: req.params.id });
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/bars/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Bar.updateOne(
            { id: req.params.id },
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
// DELETE http://localhost:5000/api/bars/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Bar.deleteOne({ id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;