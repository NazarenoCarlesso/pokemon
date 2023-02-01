const { Router } = require('express')
const { pokemonAll, pokemonById, pokemonCreate } = require('../controllers/pokemon.js')
// create router
const router = Router()
// get routes
router.get('/', pokemonAll)
router.get('/:id', pokemonById)
// post routes
router.post('/', pokemonCreate)

module.exports = router