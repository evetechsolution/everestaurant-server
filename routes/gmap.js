const express = require('express');
const router = express.Router();
var axios = require('axios');

//GET GMAP DIRECTION API
router.get('/directions/:origin/:destination', async (req, res) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/directions/json?destination=${req.params.destination}&origin=${req.params.origin}&key=${process.env.GMAP_API_KEY}`,
        headers: {}
    };
    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        });
});

router.get('/places/:input', async (req, res) => {
    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.input}&key=${process.env.GMAP_API_KEY}`,
        headers: {}
    };
    axios(config)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.json(error);
        });
});


module.exports = router;