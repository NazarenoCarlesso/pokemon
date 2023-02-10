require('dotenv').config()
const fetch = require('node-fetch')
const { Pokemon, Type } = require('../db.js')
// limita la cantidad de pokemons a traer de la API
const { FETCH_LIMIT } = process.env

const pokemonDB = async () => {
    // creo el array de pokemons
    let pokemons = []
    // traemos a los pokemons de la DB
    const pokemonsDatabase = await Pokemon.findAll()
    // filtramos la data necesaria
    await Promise.all(pokemonsDatabase.map(pokemon => pokemon.getTypes()
        .then(types => ({ ...pokemon.dataValues, types: types }))
        .then(data => pokemons.push({
            id: data.id + Number(FETCH_LIMIT),
            name: data.name,
            imagePokedex: data.imagePokedex,
            health: data.health,
            attack: data.attack,
            defense: data.defense,
            speed: data.speed,
            types: data.types.map(t => t.dataValues.name)
        }))
    ))
    // devolvemos los pokemons de la DB
    return pokemons
}

const pokemonApi = async () => {
    // creo el array de pokemons
    let pokemons = []
    // arragle con las urls necesarias para buscar los pokemons
    const pokemonUrls = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${FETCH_LIMIT}`)
        .then(response => response.json())
        .then(data => data.results.map(r => r.url))
    // traemos la data necesaria de la API
    await Promise.all(pokemonUrls.map(url => fetch(url)
        .then(response => response.json())
        .then(data => pokemons.push({
            id: data.id,
            name: data.name,
            imagePokedex: data.sprites.front_default,
            health: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            types: data.types.map(t => t.type.name)
        }))
    ))
    // devolvemos los pokemons de la API
    return pokemons
}

const pokemonByIdDB = async (id) => {
    return await Pokemon.findByPk(Number(id) - Number(FETCH_LIMIT))
        .then(pokemon => pokemon.getTypes()
            .then(types => ({ ...pokemon.dataValues, types: types }))
            .then(data => ({
                ...data,
                id: data.id + Number(FETCH_LIMIT),
                types: data.types.map(t => t.dataValues.name)
            }))
        )
}

const pokemonByIdApi = async (id) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => ({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            imagePokedex: data.sprites.front_default,
            imageDetail: data.sprites.other.home.front_default,
            types: data.types.map(t => t.type.name),
            health: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat
        }))
}

const pokemonCreate = async ({
    name, height, weight, imagePokedex, imageDetail,
    health, attack, defense, speed
}) => {
    return await Pokemon.create({
        name: name.toLowerCase(), height, weight, imagePokedex, imageDetail,
        health, attack, defense, speed
    })
}

const pokemonAddTypes = async (pokemon, types) => {
    return await Promise.all(types.map(type => Type.findOne({ where: { name: type } })))
        .then(types => types.filter(t => t))
        .then(types => types.map(type => type.dataValues.id))
        .then(types => types.map(id => pokemon.addType(id, { through: 'pokemon_type' })))
}

module.exports = { pokemonDB, pokemonApi, pokemonByIdDB, pokemonByIdApi, pokemonCreate, pokemonAddTypes }