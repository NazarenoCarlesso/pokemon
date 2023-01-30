const { Type } = require('../db.js')

const typeAll = async (req, res) => {
    const { results } = await fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())

    const types = results.map(type => type.name)

    await Promise.all(
        types.map(type => Type.findOrCreate({ where: { name: type } }))
    )

    res.status(200).json(types)
}

module.exports = { typeAll }