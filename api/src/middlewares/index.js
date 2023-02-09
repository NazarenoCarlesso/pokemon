const validatePokemon = (req, res, next) => {
    const { name, types } = req.body
    // validaciones
    if (!name) return res.status(400).json({ msg: 'Pokemon name is required' })
    if (!types) return res.status(400).json({ msg: 'Pokemon type is required' })
    if (types.length !== 1 && types.length !== 2)
        return res.status(400).json({ msg: 'Pokemon types (min 1 max 2)' })
    // next
    next()
}

module.exports = { validatePokemon }