const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/ingredients/
router.get('/', async (req, res) => {
    try {
        const listofData = await Ingredient.find();
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/ingredients/create
router.post('/create', async (req, res) => {
    try {
        const data = new Ingredient(req.body);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/ingredients/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Ingredient.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/ingredients/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Ingredient.updateOne(
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
// DELETE http://localhost:5000/api/ingredients/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Ingredient.remove({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;