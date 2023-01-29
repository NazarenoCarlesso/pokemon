const { Router } = require('express')
const { pokemonAll, pokemonById, pokemonCreate } = require('../controllers/pokemon.js')

const router = Router()

router.get('/', pokemonAll)
router.get('/:id', pokemonById)

router.post('/', pokemonCreate)

module.exports = router