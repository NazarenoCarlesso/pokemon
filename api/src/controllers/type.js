const { Type } = require('../db.js')

const typeAllApi = async () => {
    return await fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())
        .then(data => data.results)
        .then(results => results.map(type => type.name))
}

const typeAllDB = async (types) => {
    return await Promise.all(
        types.map(type => Type.findOrCreate({ where: { name: type } }))
    )
}

module.exports = { typeAllApi, typeAllDB }