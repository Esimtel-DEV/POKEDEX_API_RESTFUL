const jwt = require('jsonwebtoken');
const userRepository = require('../models/user.model');


class AuthService {
  async register(username, password) {
    // Verificar si el usuario ya existe
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('Usuario ya registrado');
    }

    // Crear nuevo usuario
    const user = await userRepository.create({ username, password });
    return this.generateToken(user);
  }

  async login(username, password) {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Credenciales inválidas');
    }

    return this.generateToken(user);
  }

  generateToken(user) {
    return jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}

module.exports = AuthService;