require('dotenv').config()
const { pokemonDB, pokemonApi, pokemonByIdDB, pokemonByIdApi, pokemonCreate, pokemonAddTypes } = require('../controllers/pokemon.js')
// limita la cantidad de pokemons a traer de la API
const { FETCH_LIMIT } = process.env

const pokemonAllHandler = async (req, res) => {
    // puede venir el nombre del pokemon en el query
    const { name } = req.query
    // creo el array de pokemons
    let pokemons = []
    // le agregamos los pokemons de la DB
    try {
        pokemons = pokemons.concat(await pokemonDB())
    } catch (error) {
        res.status(500).json({ msg: `DATABASE CONNECTION ERROR ${name}` })
    }
    // le agregamos los pokemons de la API
    try {
        pokemons = pokemons.concat(await pokemonApi())
    } catch (error) {
        res.status(500).json({ msg: `API CONNECTION ERROR ${name}` })
    }
    // si tenemos nombre en query
    if (name) {
        const pokemon = pokemons.filter(p => p.name === name.toLowerCase())
        return pokemon.length > 0
            ? res.status(200).json(pokemon)
            : res.status(404).json({ msg: `There is no pokémon named ${name}` })
    }
    // respondemos con el arreglo de pokemons ORDENADO por ID
    res.status(200).json(pokemons.sort((a, b) => a.id - b.id))
}

const pokemonByIdHandler = async (req, res) => {
    // la ID debe venir por parametro
    const { id } = req.params
    // extraemos el pokemon fuera del if
    let pokemon
    // determina donde hay que buscarlo
    try {
        pokemon = id > Number(FETCH_LIMIT)
            ? pokemon = await pokemonByIdDB(id)
            : pokemon = await pokemonByIdApi(id)
    } catch (error) {
        res.status(400).json({ msg: `There is no pokémon with the id ${id}` })
    }
    // respondemos con el pokemon encontrado
    res.status(200).json(pokemon)
}

const pokemonCreateHandler = async (req, res) => {
    // debo recibir los parametros en el body de la request
    const { name, height, weight, imagePokedex, imageDetail,
        health, attack, defense, speed, types } = req.body
    // data para crear pokemon
    const pokemonData = {
        name, height, weight, imagePokedex, imageDetail,
        health, attack, defense, speed
    }
    // creo un pokemon con los datos
    let newPokemon
    try {
        newPokemon = await pokemonCreate(pokemonData)
    } catch (error) {
        return res.status(400).json({ msg: error.message })
    }
    // validacion de types
    if (!types || types.length === 0) return res.status(400).json({ msg: 'Pokemon must have at least one type' })
    // le agrego al pokemon los distintos tipos
    try {
        await pokemonAddTypes(newPokemon, types)
    } catch (error) {
        return res.status(500).json({ msg: 'DATABASE ERROR (ADD_TYPES)' })
    }
    // respondemos con el pokemon creado
    res.status(201).json(newPokemon)
}

module.exports = { pokemonAllHandler, pokemonByIdHandler, pokemonCreateHandler }