require('dotenv').config()
const { Pokemon, Type } = require('../db.js')
// limita la cantidad de pokemons a traer de la API
const { FETCH_LIMIT } = process.env

const pokemonAll = async (req, res) => {
    let pokemons = []

    const pokemonUrls = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT}`)
        .then(response => response.json())
        .then(data => data.results.map(r => r.url))

    await Promise.all(pokemonUrls.map(url => fetch(url)
        .then(response => response.json())
        .then(data => pokemons.push({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map(t => t.type.name)
        }))
    ))

    const pokemonsDatabase = await Pokemon.findAll()

    await Promise.all(pokemonsDatabase.map(pokemon => pokemon.getTypes()
        .then(types => ({ ...pokemon.dataValues, types: types }))
        .then(data => pokemons.push({
            id: data.id + 1279,
            name: data.name,
            image: data.image,
            types: data.types.map(t => t.dataValues.name)
        }))
    ))

    res.status(200).json(pokemons)
}

const pokemonById = async (req, res) => {
    const { id } = req.params

    let pokemon

    if (id > 1279) {
        pokemon = await Pokemon.findByPk(Number(id) - 1279)
            .then(pokemon => pokemon.getTypes()
                .then(types => ({ ...pokemon.dataValues, types: types }))
                .then(data => ({
                    ...data,
                    id: data.id + 1279,
                    types: data.types.map(t => t.dataValues.name)
                }))
            )
    } else {
        pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
    }

    res.status(200).json(pokemon)
}

const pokemonCreate = async (req, res) => {
    const { name, height, weight, image, health,
        attack, defense, speed, types } = req.body

    const newPokemon = await Pokemon.create({
        name, height, weight, image,
        health, attack, defense, speed
    })

    Promise.all(
        types.map(type => Type.findOne({ where: { name: type } })
            .then(type => type.dataValues.id)
            .then(id => newPokemon.addType(id, { through: 'pokemon_type' })))
    )

    res.status(201).json(newPokemon)
}

module.exports = { pokemonAll, pokemonById, pokemonCreate }