const { Pokemon } = require('../db.js')

const pokemonAll = async (req, res) => {
    const pokemons = []

    const pokemonUrls = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40')
        .then(response => response.json())
        .then(data => data.results.map(r => r.url))

    await Promise.all(pokemonUrls.map(url => fetch(url)
        .then(response => response.json())
        .then(data => {
            pokemons.push({
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                types: data.types.map(t => t.type.name)
            })
        })
    ))

    res.status(200).json(pokemons)
}

const pokemonById = async (req, res) => {
    const { id } = req.params

    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => ({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            image: data.sprites.other.home.front_default,
            types: data.types.map(t => t.type.name),
            health: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat
        }))

    res.status(200).json(pokemon)
}

module.exports = { pokemonAll, pokemonById }