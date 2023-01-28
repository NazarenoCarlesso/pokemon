const { Router } = require('express')
const { typeAll } = require('../controllers/type.js')

const router = Router()

router.get('/', typeAll)

module.exports = router