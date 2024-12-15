const pokemonRepository = require('../models/pokemon.model');

class PokemonService {
  async getAllPokemon(page, limit) {
    return await pokemonRepository.findAll(page, limit);
  }

  async getPokemonById(id) {
    const pokemon = await pokemonRepository.findById(id);
    if (!pokemon) {
      throw new Error('Pokémon no encontrado');
    }
    return pokemon;
  }

  async getMyPokemon(trainerId) {
    return await pokemonRepository.findByTrainerId(trainerId);
  }

  async createPokemon(pokemonData, trainerId) {
    return await pokemonRepository.create({
      ...pokemonData,
      trainerId
    });
  }

  async updatePokemon(id, updateData, trainerId) {
    const pokemon = await this.getPokemonById(id);
    
    if (pokemon.trainerId.toString() !== trainerId) {
      throw new Error('No autorizado para modificar este Pokémon');
    }

    return await pokemonRepository.updateById(id, updateData);
  }

  async deletePokemon(id, trainerId) {
    const pokemon = await this.getPokemonById(id);
    
    if (pokemon.trainerId.toString() !== trainerId) {
      throw new Error('No autorizado para eliminar este Pokémon');
    }

    return await pokemonRepository.deleteById(id);
  }
}

module.exports = PokemonService;