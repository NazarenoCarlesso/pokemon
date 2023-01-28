const { Pokemon } = require('../db.js')

const pokemonAll = async (req, res) => {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(response => response.json())

    res.status(200).json(pokemons.results)
}

const pokemonById = async (req, res) => {
    const { id } = req.params

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())

    res.status(200).json(pokemon.name)
}

module.exports = { pokemonAll, pokemonById }