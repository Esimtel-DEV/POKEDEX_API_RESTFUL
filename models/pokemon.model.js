class pokemonModel {
  constructor() {
      this.pokemon = new Map();
      this.pokemonId = 1;
  }

  // Pokemon methods
  createPokemon(pokemonData) {
      const id = this.pokemonId++;
      const pokemon = { id, ...pokemonData };
      this.pokemon.set(id, pokemon);
      return pokemon;
  }

  findAllPokemon() {
      return Array.from(this.pokemon.values());
  }

  findPokemonById(id) {
      return this.pokemon.get(id);
  }

  findPokemonByTrainer(trainerId) {
      return Array.from(this.pokemon.values()).filter(pokemon => pokemon.trainerId === trainerId);
  }

  updatePokemon(id, data) {
      const pokemon = this.pokemon.get(id);
      if (!pokemon) return null;
      const updated = { ...pokemon, ...data };
      this.pokemon.set(id, updated);
      return updated;
  }

  deletePokemon(id) {
      return this.pokemon.delete(id);
  }
}

const db = new pokemonModel();
module.exports = db;