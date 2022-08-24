const pusher = require('../lib/pusher');

module.exports = function (req, res, next) {
    if (req.body.orderType !== "Manual") {
        pusher.trigger("channel-order", "event-order", {
            message: `${req.body.isUpdate ? 'Update' : 'New'} Order from Table ${req.body.tableName}`
        });
    }
    next();
}