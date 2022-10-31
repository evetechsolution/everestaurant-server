const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

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

router.get('/revenue', async (req, res) => {
    try {
        Order.aggregate([
            { $match: { status: "Paid" } },
            {
                $group: {
                    _id: { $year: "$date" },
                    revenue: { $sum: "$billedAmount" },
                    sales: { $count: {} },
                }
            },
            {
                $project: {
                    _id: 1,
                    revenue: 1,
                    sales: 1,
                }
            }
        ]).exec((err, result) => {
            if (err) {
                res.send(err);
            }
            if (result) {
                res.send(result);
            }
        })
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

module.exports = router;