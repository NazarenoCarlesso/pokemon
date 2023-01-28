const { Type } = require('../db.js')

const typeAll = async (req, res) => {
    const types = await fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())

    res.status(200).json(types.results)
}

module.exports = { typeAll }