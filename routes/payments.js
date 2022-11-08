const express = require('express');
const router = express.Router();
const axios = require('axios');

// CREATE NEW INVOICE
// POST http://localhost:5000/api/payments/create
router.post('/create', async (req, res) => {
    let url = `https://everestaurant-clientorder.vercel.app/dine-in/${req.body.id}`;
    if (req.body.orderType === 'Delivery') {
        url = `https://www.downtowndiner.id/delivery/${req.body.id}`;
    }
    const reqBody = {
        external_id: req.body.id,
        amount: req.body.total,
        description: "Invoice",
        invoice_duration: 3600,
        currency: "IDR",
        locale: "id",
        success_redirect_url: `${url}/success`,
        failure_redirect_url: `${url}/failed`,
        items: req.body.orders,
        fees: req.body.optional
    };

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": process.env.XENDIT_KEY,
    }

    try {
        const { data } = await axios.post(`${process.env.XENDIT_URL}/v2/invoices`, JSON.stringify(reqBody), {
            headers: headers,
        });
        res.json(data);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;