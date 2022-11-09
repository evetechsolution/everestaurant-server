const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Qrdata = require('../models/qrdata');
const { cloudinary } = require('../lib/cloudinary');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/qrdata/
router.get('/', async (req, res) => {
    try {
        const listofData = await Qrdata.find();
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/open-key/:id', async (req, res) => {
    try {
        const listofData = await Qrdata.find({ qrKey: req.params.id, $or: [{ status: "Open" }, { status: "open" }] });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// CREATE NEW DATA
// POST http://localhost:5000/api/qrdata/create
router.post('/create', async (req, res) => {
    try {
        const options = {
            errorCorrectionLevel: 'H',
        };
        QRCode.toDataURL(`${process.env.QRORDER_URL}/${req.body.qrKey}`, options, async function (err, url) {
            if (err) return res.status(400).json(err);

            const cloud = await cloudinary.uploader.upload(url, {
                folder: "downtown-diner-qr",
            });

            const objData = Object.assign(req.body, { image: cloud.secure_url, imageId: cloud.public_id });

            const data = new Qrdata(objData);
            const newData = await data.save();
            res.json(newData);
        });
    } catch (err) {
        res.json({ message: err });
    }
});

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/qrdata/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Qrdata.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/qrdata/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Qrdata.updateOne(
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
// DELETE http://localhost:5000/api/qrdata/:id
router.delete('/:id', async (req, res) => {
    try {
        // Check image & delete image
        const exist = await Qrdata.findById(req.params.id);
        if (exist.imageId) {
            await cloudinary.uploader.destroy(exist.imageId);
        }

        const deletedData = await Qrdata.deleteOne({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;