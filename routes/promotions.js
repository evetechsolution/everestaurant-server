const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Promotion = require('../models/promotion');

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'public/pictures/promotion', // Destination to store image 
    filename: (req, file, cb) => {
        cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});

const imageUpload = multer({
    storage: imageStorage,
    // limits: {
    //     fileSize: 1000000   // 1000000 Bytes = 1 MB
    // },
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image')) {     // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

// For Single image upload
router.post('/uploadImage', imageUpload.single('image'), (req, res) => {
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// GETTING ALL THE DATA
// GET http://localhost:5000/api/promotions/
router.get('/', async (req, res) => {
    try {
        const listofData = await Promotion.find().sort({ "listNumber": 1 });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/available', async (req, res) => {
    try {
        const listofData = await Promotion.find().where("isAvailable").equals("true").sort({ "listNumber": 1 });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/promotions/create/
router.post('/create', imageUpload.single('image'), async (req, res) => {
    try {
        let objData = req.body;

        if (req.file) {
            const objImage = {
                image: req.protocol + "://" + req.get("host") + "/pictures/promotion/" + req.file.filename,
            }
            objData = Object.assign(req.body, objImage);
        }

        const data = new Promotion(objData);
        const newData = await data.save();
        res.json(newData);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/promotions/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Promotion.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/promotions/:id
router.patch('/:id', imageUpload.single('image'), async (req, res) => {
    try {
        let objData = req.body;

        if (req.file) {
            // Chek product image & delete image
            const existData = await Promotion.findById(req.params.id);
            if (existData.image) {
                try {
                    const { pathname } = new URL(existData.image);
                    if (fs.existsSync('./public' + pathname)) {
                        fs.unlinkSync('./public' + pathname);
                    }
                } catch (error) {
                    if (fs.existsSync(existData.image)) {
                        fs.unlinkSync('./public' + pathname);
                    }
                }
            }

            const objImage = {
                image: req.protocol + "://" + req.get("host") + "/pictures/promotion/" + req.file.filename,
            }
            objData = Object.assign(req.body, objImage);
        }


        const updatedData = await Promotion.updateOne(
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
// DELETE http://localhost:5000/api/promotions/:id
router.delete('/:id', async (req, res) => {
    try {
        // Chek product image & delete image
        const existData = await Promotion.findById(req.params.id);
        if (existData.image) {
            try {
                const { pathname } = new URL(existData.image);
                if (fs.existsSync('./public' + pathname)) {
                    fs.unlinkSync('./public' + pathname);
                }
            } catch (error) {
                if (fs.existsSync(existData.image)) {
                    fs.unlinkSync('./public' + pathname);
                }
            }
        }

        const deletedData = await Promotion.deleteOne({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;