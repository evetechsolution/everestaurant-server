const pusher = require('../lib/pusher');

module.exports = function (req, res, next) {
    if (req.body.orderType !== "Manual") {
        pusher.trigger("channel-order", "event-order", {
            message: `New Order From Table ${req.body.tableName}`
        });
    }
    next();
}