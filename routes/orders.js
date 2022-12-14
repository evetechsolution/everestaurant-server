const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const paginate = require('mongoose-paginate-v2');
// const notifOrder = require('./pusherOrder');

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

// GETTING ALL THE DATA PAGINATE
// GET http://localhost:5000/api/orders/paginate
router.get('/paginate', async (req, res) => {
    try {
        const { page, perPage, search } = req.query;
        let query = {};
        if (search) {
            query = {
                ...query,
                // _id: { $regex: search, $options: 'i' },  // option i for case insensitivity to match upper and lower cases.
                $or: [ { '_id': { $regex: search, $options: 'i' } }, { 'tableName': { $regex: search, $options: 'i' } } ],  // option i for case insensitivity to match upper and lower cases.
            };
        };
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 5,
            sort: { date: -1 },
        }
        const listofData = await Order.paginate(query, options);
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
// router.post('/create', notifOrder, async (req, res) => {
router.post('/create', async (req, res) => {
    try {
        const data = new Order(req.body);
        const newData = await data.save();
        res.json(newData);
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
// router.patch('/exist/:id', notifOrder, async (req, res) => {
router.patch('/exist/:id', async (req, res) => {
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