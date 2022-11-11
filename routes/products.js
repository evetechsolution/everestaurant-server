const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product');
const { cloudinary } = require('../lib/cloudinary');

const imageStorage = multer.diskStorage({});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000   // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image')) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
});

// GETTING ALL THE DATA
// GET http://localhost:5000/api/products/
router.get('/', async (req, res) => {
    try {
        const listofData = await Product.find().sort({ "name": 1 });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/products/create/
router.post('/create', imageUpload.single('image'), async (req, res) => {
    try {
        let objData = req.body;

        const objVariant = {
            variant: JSON.parse(req.body.variantString)
        }
        objData = Object.assign(objData, objVariant);

        if (req.file) {
            const cloud = await cloudinary.uploader.upload(req.file.path, {
                folder: "downtown-diner",
            });
            objData = Object.assign(objData, { image: cloud.secure_url, imageId: cloud.public_id });
        }

        const data = new Product(objData);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Product.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/products/:id
router.patch('/:id', imageUpload.single('image'), async (req, res) => {
    try {
        let objData = req.body;

        const objVariant = {
            variant: JSON.parse(req.body.variantString)
        }
        objData = Object.assign(objData, objVariant);

        if (req.file) {
            // Chek product image & delete image
            const productExist = await Product.findById(req.params.id);
            if (productExist.imageId) {
                await cloudinary.uploader.destroy(productExist.imageId);
            }

            const cloud = await cloudinary.uploader.upload(req.file.path, {
                folder: "downtown-diner",
            });
            objData = Object.assign(objData, { image: cloud.secure_url, imageId: cloud.public_id });
        }


        const updatedData = await Product.updateOne(
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
// DELETE http://localhost:5000/api/products/:id
router.delete('/:id', async (req, res) => {
    try {
        // Check product image & delete image
        const productExist = await Product.findById(req.params.id);
        if (productExist.imageId) {
            await cloudinary.uploader.destroy(productExist.imageId);
        }

        const deletedData = await Product.deleteOne({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;