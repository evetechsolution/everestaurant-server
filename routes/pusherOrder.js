const pusher = require('../lib/pusher');

module.exports = function (req, res, next) {
    if (req.body.orderType !== "Manual") {
        if (req.body.orderType === "QR COde") {
            pusher.trigger("channel-order", "event-order", {
                message: `${req.body.isUpdate ? 'Update' : 'New'} Order from Table ${req.body.tableName}`
            });
        }
        if (req.body.orderType === "Delivery") {
            pusher.trigger("channel-order", "event-order", {
                message: `New Delivery Order from ${req.body.customer.name} (${req.body.customer.phone})`
            });
        }
    }
    next();
}