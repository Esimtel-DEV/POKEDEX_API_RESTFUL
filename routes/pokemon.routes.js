const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon.controller');
const auth = require('../middleware/auth');
const ownerAuth = require('../middleware/ownerAuth');

router.get('/', pokemonController.getAllPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.get('/trainer/mypokemons', auth, pokemonController.getMyPokemon);
router.post('/', auth, pokemonController.createPokemon);
router.put('/:id', auth, ownerAuth, pokemonController.updatePokemon);
router.delete('/:id', auth, ownerAuth, pokemonController.deletePokemon);

module.exports = router;