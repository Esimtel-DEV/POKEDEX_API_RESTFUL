const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const pokemonRoutes = require('./routes/pokemon.routes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`PokedexApp is running on port ${PORT}`);
});