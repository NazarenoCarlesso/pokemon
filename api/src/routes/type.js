const { Router } = require('express')
const { typeAll } = require('../controllers/type.js')
// create router
const router = Router()
// get routes
router.get('/', typeAll)

module.exports = router