const { typeAllApi, typeAllDB } = require("../controllers/type")

const typeAllHandler = async (req, res) => {
    // traeme todos los tipos de la API
    const types = await typeAllApi()
    // actualizalos en la DB
    typeAllDB(types)
    // devolve los tipos
    res.status(200).json(types)
}

module.exports = { typeAllHandler }