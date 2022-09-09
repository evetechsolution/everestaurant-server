const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const QRCode = require('qrcode');
const Order = require('../models/order');
const notifOrder = require('./pusherOrder');

// GETTING ALL THE DATA
// GET http://localhost:5000/api/orders/
router.get('/', async (req, res) => {
    try {
        const listofData = await Order.find();
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/saved-bill', async (req, res) => {
    try {
        const listofData = await Order.find().where('status').equals('pending');
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// router.get('/all', async (req, res) => {
//     try {
//         Order.aggregate([
//             {
//                 $lookup: {
//                     from: "customers",
//                     localField: "customerId",
//                     foreignField: "_id",
//                     as: "customer",
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     date: 1,
//                     customer: {
//                         name: 1,
//                         phone: 1
//                     },
//                 }
//             }
//         ]).exec((err, result) => {
//             if (err) {
//                 res.send(err);
//             }
//             if (result) {
//                 res.send(result)
//             }
//         })
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// router.get('/yearly-sales', async (req, res) => {
//     try {
//         Order.aggregate([
//             {
//                 $group: {
//                     _id: { $year: "$date" },
//                     revenue: { $sum: "$billedAmount" },
//                     sales: { $count: {} },
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     revenue: 1,
//                     sales: 1,
//                 }
//             }
//         ]).exec((err, result) => {
//             if (err) {
//                 res.send(err);
//             }
//             if (result) {
//                 res.send(result);
//             }
//         })
//     } catch (err) {
//         res.json({ message: err });
//     }
// });

// CREATE NEW DATA
// POST http://localhost:5000/api/orders/create
router.post('/create', notifOrder, async (req, res) => {
    try {
        const generateId = mongoose.Types.ObjectId();
        const options = {
            errorCorrectionLevel: 'H',
        };
        QRCode.toDataURL(`${generateId}`, options, async function (err, url) {
            if (err) return res.status(400).json(err);

            const objCustom = {
                _id: generateId,
                image: url,
            }
            const objData = Object.assign(req.body, objCustom);

            const data = new Order(objData);
            const newData = await data.save();
            res.json(newData);
        });
    } catch (err) {
        res.json({ message: err });
    }
});


// get exist data for order by qr
router.get('/exist/:id', async (req, res) => {
    try {
        const listofData = await Order.find({ qrKey: req.params.id, $or: [{ status: "Pending" }, { status: "pending" }] });
        res.json(listofData);
    } catch (err) {
        res.json({ message: err });
    }
});

// update exist data for order by qr
router.patch('/exist/:id', notifOrder, async (req, res) => {
    try {
        const updatedData = await Order.updateOne(
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

// GET A SPECIFIC DATA
// GET http://localhost:5000/api/orders/:id
router.get('/:id', async (req, res) => {
    try {
        const spesificData = await Order.findById(req.params.id);
        res.json(spesificData);
    } catch (err) {
        res.json({ message: err });
    }
});

// UPDATE A SPECIFIC DATA
// PATCH http://localhost:5000/api/orders/:id
router.patch('/:id', async (req, res) => {
    try {
        const updatedData = await Order.updateOne(
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
// DELETE http://localhost:5000/api/orders/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await Order.deleteOne({ _id: req.params.id });
        res.json(deletedData);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;