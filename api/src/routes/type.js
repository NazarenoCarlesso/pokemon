const { Router } = require('express')
const { typeAllHandler } = require('../handlers/types')
// create router
const router = Router()
// get routes
router.get('/', typeAllHandler)

module.exports = router