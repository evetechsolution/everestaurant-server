const express = require('express');
const router = express.Router();
const Table = require('../models/tableview');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/table-view/
router.get('/', async (req, res) => {
    try {
        const listofData = await Table.find().sort({ "id": 1 });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/table-view/create
router.post('/create', async (req, res) => {
    try {
        const data = new Table(req.body);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/table-view/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Table.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/table-view/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Table.updateOne(
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

// UPDATE A SPECIFIC DATA BY NUMBER
// PATCH http://localhost:5000/api/table-view/:id
router.patch('/update/:id', async (req, res) => {
    try {
        const updatedData = await Table.updateOne(
            { number: req.params.id },
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
// DELETE http://localhost:5000/api/table-view/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Table.deleteOne({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;