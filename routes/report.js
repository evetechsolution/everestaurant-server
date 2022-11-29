const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

// GETTING ALL REVENUE
// GET http://localhost:5000/api/report/revenue
router.get('/revenue', async (req, res) => {
    try {
        Order.aggregate([
            {
                $match: {
                    status: "Paid"
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$billedAmount" },
                    count: { $count: {} },
                }
            },
            {
                $project: {
                    _id: 0,
                    revenue: 1,
                    count: 1,
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

// GETTING YEARLY REVENUE
// GET http://localhost:5000/api/report/revenue/yearly
router.get('/revenue/yearly', async (req, res) => {
    try {
        Order.aggregate([
            {
                $match: {
                    status: "Paid"
                }
            },
            {
                $group: {
                    _id: {
                        $year: {
                            date: "$date",
                            timezone: "Asia/Jakarta"
                        }
                    },
                    revenue: { $sum: "$billedAmount" },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id",
                    revenue: 1,
                    count: 1
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

// GETTING REVENUE THIS YEAR
// GET http://localhost:5000/api/report/revenue/this-year
router.get('/revenue/this-year', async (req, res) => {
    try {
        var year = new Date().getFullYear(); // this year
        var start = new Date(year, 1, 1);
        var end = new Date(year + 1, 1, 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$billedAmount" },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: { $year: new Date() },
                    revenue: 1,
                    count: 1
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

// GETTING REVENUE THIS MONTH
// GET http://localhost:5000/api/report/revenue/this-month
router.get('/revenue/this-month', async (req, res) => {
    try {
        var curr = new Date(); // this date
        var year = curr.getFullYear(); // this year
        var month = curr.getMonth(); // this month
        var start = new Date(year, month, 1);
        var end = new Date(year, month + 1, 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$billedAmount" },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: { $month: new Date() },
                    revenue: 1,
                    count: 1
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

// GETTING REVENUE MONTHLY
// GET http://localhost:5000/api/report/revenue/monthly
router.get('/revenue/monthly', async (req, res) => {
    try {
        var year = new Date().getFullYear(); // this year
        var start = new Date(year, 1, 1);
        var end = new Date(year + 1, 1, 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        $month: {
                            date: "$date",
                            timezone: "Asia/Jakarta"
                        }
                    },
                    revenue: { $sum: "$billedAmount" },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    revenue: 1,
                    count: 1
                }
            },
            { $sort: { month: 1 } }
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

// GETTING REVENUE WEEKLY
// GET http://localhost:5000/api/report/revenue/weekly
router.get('/revenue/weekly', async (req, res) => {
    try {
        var curr = new Date(); // this date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var year = curr.getFullYear(); // this year
        var month = curr.getMonth(); // this month
        var start = new Date(year, month, first);
        var end = new Date(year, month, last + 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: {
                            date: "$date",
                            timezone: "Asia/Jakarta"
                        }
                    },
                    revenue: { $sum: "$billedAmount" },
                    count: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    day: "$_id",
                    revenue: 1,
                    count: 1
                }
            },
            { $sort: { day: 1 } }
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

// GETTING REVENUE & SALES TODAY
// GET http://localhost:5000/api/report/revenue/dayly
router.get('/revenue/daily', async (req, res) => {
    try {
        var curr = new Date(); // this date
        var year = curr.getFullYear(); // this year
        var month = curr.getMonth(); // this month
        var today = curr.getDate(); // today
        var start = new Date(year, month, today);
        var end = new Date(year, month, today + 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$billedAmount" },
                    sales: { $count: {} }
                }
            },
            {
                $project: {
                    _id: 0,
                    revenue: 1,
                    sales: 1
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

// GETTING SALES WEEKLY
// GET http://localhost:5000/api/report/sales/weekly
router.get('/sales/weekly', async (req, res) => {
    try {
        var curr = new Date(); // this date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        var year = curr.getFullYear(); // this year
        var month = curr.getMonth(); // this month
        var start = new Date(year, month, first);
        var end = new Date(year, month, last + 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfWeek: {
                                date: "$date",
                                timezone: "Asia/Jakarta"
                            }
                        }
                    },
                    myCount: { $count: {} }
                }
            },
            { $sort: { "_id.day": 1 } },
            {
                $group: {
                    _id: null,
                    // day: { $push: "$_id.day" },
                    day: {
                        $push: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$_id.day", 1] }, then: "Sun" },
                                    { case: { $eq: ["$_id.day", 2] }, then: "Mon" },
                                    { case: { $eq: ["$_id.day", 3] }, then: "Tue" },
                                    { case: { $eq: ["$_id.day", 4] }, then: "Wed" },
                                    { case: { $eq: ["$_id.day", 5] }, then: "Thu" },
                                    { case: { $eq: ["$_id.day", 6] }, then: "Fri" },
                                    { case: { $eq: ["$_id.day", 7] }, then: "Sat" },
                                ]
                            }
                        }
                    },
                    total: { $push: "$myCount" },
                }
            },
            {
                $project: {
                    _id: 0,
                    type: "Weekly",
                    label: "$day",
                    sales: [{
                        name: "Dine In",
                        data: "$total"

                    }]
                }
            },
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

// GETTING SALES MONTHLY
// GET http://localhost:5000/api/report/sales/monthly
router.get('/sales/monthly', async (req, res) => {
    try {
        var curr = new Date(); // this date
        var year = curr.getFullYear(); // this year
        var month = curr.getMonth(); // this month
        var start = new Date(year, 1, 1);
        var end = new Date(year + 1, 1, 1);
        Order.aggregate([
            {
                $match:
                {
                    $and: [
                        { status: "Paid" },
                        {
                            date: {
                                $gte: start,
                                $lt: end
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: {
                                date: "$date",
                                timezone: "Asia/Jakarta"
                            }
                        }
                    },
                    myCount: { $count: {} }
                }
            },
            { $sort: { "_id.month": 1 } },
            {
                $group: {
                    _id: null,
                    // month: { $push: "$_id.month" },
                    month: {
                        $push: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                                    { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                                    { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                                    { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                                    { case: { $eq: ["$_id.month", 5] }, then: "May" },
                                    { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                                    { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                                    { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                                    { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                                    { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                                    { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                                    { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
                                ]
                            }
                        }
                    },
                    total: { $push: "$myCount" },
                }
            },
            {
                $project: {
                    _id: 0,
                    type: "Monthly",
                    label: "$month",
                    sales: [{
                        name: "Dine In",
                        data: "$total"

                    }]
                }
            },
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

module.exports = router;