const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/user.model');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (db.findUserByUsername(username)) {
            return res.status(400).json({ error: 'El usuario ya existe en los registros' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = db.createUser({
            username,
            password: hashedPassword,
            role: 'trainer'
        });

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || '50318831c118d0020efe9905500146a18f660ab65bbe8cb36519df5a56a813449374b5b58bdfe7f0796521bdac86442cf00f912fc176a64ef9a3e6098308d43e'
        );

        res.status(201).json({ user: { ...user, password: undefined }, token });
    } catch (error) {
        res.status(400).json({ error: 'Error en el registro' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = db.findUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || '50318831c118d0020efe9905500146a18f660ab65bbe8cb36519df5a56a813449374b5b58bdfe7f0796521bdac86442cf00f912fc176a64ef9a3e6098308d43e'
        );

        res.json({ user: { ...user, password: undefined }, token });
    } catch (error) {
        res.status(500).json({ error: 'Error en Login' });
    }
};

module.exports = {
    register,
    login
};