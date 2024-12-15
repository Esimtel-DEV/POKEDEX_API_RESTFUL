const jwt = require('jsonwebtoken');
const db = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error();

        const decoded = jwt.verify(token, process.env.JWT_SECRET || '50318831c118d0020efe9905500146a18f660ab65bbe8cb36519df5a56a813449374b5b58bdfe7f0796521bdac86442cf00f912fc176a64ef9a3e6098308d43e');
        const user = db.findUserById(decoded.userId);

        if (!user) throw new Error();

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Debes autenticarte.' });
    }
};

module.exports = auth;