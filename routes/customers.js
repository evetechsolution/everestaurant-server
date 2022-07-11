const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// GETTING ALL THE DATA
router.get('/', async (req, res) => {
    try {
        const listofData = await Customer.find();
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
router.post('/create', async (req, res) => {
    try {
        const data = new Customer(req.body);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Customer.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Customer.updateOne(
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
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Customer.remove({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;