const db = require('../models/pokemon.model');

const getAllPokemon = async (req, res) => {
    try {
        const pokemon = db.findAllPokemon();
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar los Pokemones' });
    }
};

const getPokemonById = async (req, res) => {
    try {
        const pokemon = db.findPokemonById(parseInt(req.params.id));
        if (!pokemon) {
            return res.status(404).json({ error: 'Pokemon no encontrado' });
        }
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el Pokemon' });
    }
};

const getMyPokemon = async (req, res) => {
    try {
        const pokemon = db.findPokemonByTrainer(req.user.id);
        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el Pokemon del Entrenador' });
    }
};

const createPokemon = async (req, res) => {
    try {
        const pokemon = db.createPokemon({
            ...req.body,
            trainerId: req.user.id,
            createdAt: new Date()
        });
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el Pokemon' });
    }
};

const updatePokemon = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'type', 'level'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        
        if (!isValidOperation) {
            return res.status(400).json({ error: 'Actualización no válida' });
        }

        const pokemon = db.updatePokemon(parseInt(req.params.id), req.body);
        res.json(pokemon);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el Pokemon' });
    }
};

const deletePokemon = async (req, res) => {
    try {
        const deleted = db.deletePokemon(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: 'Pokemon no encontrado' });
        }
        res.json({ message: 'Pokemon eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Pokemon' });
    }
};

module.exports = {
    getAllPokemon,
    getPokemonById,
    getMyPokemon,
    createPokemon,
    updatePokemon,
    deletePokemon
};