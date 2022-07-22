const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.json({ status: 401, message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = verified;
        next();
    } catch (error) {
        res.json({ status: 400, message: 'Invalid token' });
    }
}