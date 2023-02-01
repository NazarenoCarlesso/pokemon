export const pokemonsAll = (pokemons) => ({
    type: 'POKEMONS_ALL',
    payload: pokemons
})

export const typesAll = (types) => ({
    type: 'TYPES_ALL',
    payload: types
})

export const typesFilter = (types) => ({
    type: 'TYPES_FILTER',
    payload: types
})

export const apiFilter = (apis) => ({
    type: 'API_FILTER',
    payload: apis
})

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    payload: page
})