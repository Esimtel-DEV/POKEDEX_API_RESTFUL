const db = require('../models/pokemon.model');

const ownerAuth = async (req, res, next) => {
    try {
        const pokemon = db.findPokemonById(parseInt(req.params.id));
        if (!pokemon) {
            return res.status(404).json({ error: 'Pokemon no encontrado' });
        }
        
        if (pokemon.trainerId !== req.user.id) {
            return res.status(403).json({ error: 'No está autorizado para modificar este Pokemon' });
        }
        
        req.pokemon = pokemon;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = ownerAuth;