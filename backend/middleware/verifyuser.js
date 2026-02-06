const jwt = require('jsonwebtoken');

function verifyuser(req, res, next) {
    let token = req.cookies.token;

    // Also check Authorization header (standard for JSON tokens)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Not authenticated: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authenticated: Invalid token" });
    }
}

module.exports = verifyuser;