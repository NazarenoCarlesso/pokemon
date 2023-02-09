const { Router } = require('express')
const { pokemonAllHandler, pokemonByIdHandler, pokemonCreateHandler } = require('../handlers/pokemon.js')
const { validatePokemon } = require('../middlewares/index.js')
// create router
const router = Router()
// get routes
router.get('/', pokemonAllHandler)
router.get('/:id', pokemonByIdHandler)
// post routes
router.post('/', validatePokemon, pokemonCreateHandler)

module.exports = router