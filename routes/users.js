const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/users/
router.get('/', async (req, res) => {
    try {
        const listofData = await User.find().sort({ "name": 1 });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/users/create/
router.post('/create', async (req, res) => {
    try {
        // Chek username
        const usernameExist = await User.findOne({ username: req.body.username });
        if (usernameExist) return res.json({ status: 400, message: 'Username already exist' });

        // Hash password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

        const data = new User({
            username: req.body.username,
            fullname: req.body.fullname,
            password: hashedPassword,
            role: req.body.role,
        });
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
        // check username
        const spesificData = await User.findById(req.params.id);
        const usernameExist = await User.findOne({ username: req.body.username });
        if (req.body.username !== spesificData.username && usernameExist) return res.json({ status: 400, message: 'Username already exist' });

        let objData = {
            username: req.body.username,
            fullname: req.body.fullname,
            role: req.body.role,
            isActive: req.body.isActive,
        };

        // let objData = data;

        if (req.body.password) {
            // Hash password
            const salt = await bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
            const objPassword = {
                password: hashedPassword,
            }
            objData = Object.assign(objData, objPassword);
        }

        const updatedData = await User.updateOne(
            { _id: req.params.id },
            {
                $set: objData
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
        const deletedData = await User.deleteOne({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;