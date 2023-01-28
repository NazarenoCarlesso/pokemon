const { Router } = require('express')
const { pokemonAll, pokemonById } = require('../controllers/pokemon.js')

const router = Router()

router.get('/', pokemonAll)
router.get('/:id', pokemonById)

module.exports = router