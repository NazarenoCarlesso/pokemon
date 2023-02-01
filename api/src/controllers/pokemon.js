require('dotenv').config()
const { Pokemon, Type } = require('../db.js')
// limita la cantidad de pokemons a traer de la API
const { FETCH_LIMIT } = process.env

const pokemonAll = async (req, res) => {
    // puede venir el nombre del pokemon en el query
    const { name } = req.query
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
            image: data.sprites.front_default,
            attack: data.stats[1].base_stat,
            types: data.types.map(t => t.type.name)
        }))
    ))
    // traemos a los pokemons de la DB
    const pokemonsDatabase = await Pokemon.findAll()
    // filtramos la data necesaria
    await Promise.all(pokemonsDatabase.map(pokemon => pokemon.getTypes()
        .then(types => ({ ...pokemon.dataValues, types: types }))
        .then(data => pokemons.push({
            id: data.id + FETCH_LIMIT,
            name: data.name,
            image: data.image,
            types: data.types.map(t => t.dataValues.name)
        }))
    ))
    if (name) return res.status(200).json(pokemons.filter(p => p.name === name))
    // respondemos con el arreglo de pokemons ORDENADO por ID
    res.status(200).json(pokemons.sort((a, b) => a.id - b.id))
}

const pokemonById = async (req, res) => {
    const { id } = req.params // la ID debe venir por parametro
    // extraemos el pokemon fuera del if
    let pokemon
    // determina donde hay que buscarlo
    if (id > FETCH_LIMIT) { // en DB
        pokemon = await Pokemon.findByPk(Number(id) - FETCH_LIMIT)
            .then(pokemon => pokemon.getTypes()
                .then(types => ({ ...pokemon.dataValues, types: types }))
                .then(data => ({
                    ...data,
                    id: data.id + 1279,
                    types: data.types.map(t => t.dataValues.name)
                }))
            )
    } else { // en API
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
    // respondemos con el pokemon encontrado
    res.status(200).json(pokemon)
}

const pokemonCreate = async (req, res) => {
    // debo recibir los parametros en el body de la request
    const { name, height, weight, image, health,
        attack, defense, speed, types } = req.body
    // creo un pokemon con los datos
    const newPokemon = await Pokemon.create({
        name, height, weight, image,
        health, attack, defense, speed
    })
    // le agrego al pokemon los distintos tipos
    Promise.all(
        types.map(type => Type.findOne({ where: { name: type } })
            .then(type => type.dataValues.id)
            .then(id => newPokemon.addType(id, { through: 'pokemon_type' })))
    )
    // respondemos con el pokemon creado
    res.status(201).json(newPokemon)
}

module.exports = { pokemonAll, pokemonById, pokemonCreate }