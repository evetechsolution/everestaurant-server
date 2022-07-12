const express = require('express');
const router = express.Router();
const Measure = require('../models/measurement');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/measurements/
router.get('/', async (req, res) => {
    try {
        const listofData = await Measure.find();
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/measurements/create
router.post('/create', async (req, res) => {
    try {
        const data = new Measure(req.body);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/measurements/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Measure.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/measurements/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Measure.updateOne(
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
// DELETE http://localhost:5000/api/measurements/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Measure.remove({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;