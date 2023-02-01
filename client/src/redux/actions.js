export const pokemonsAll = (pokemons) => ({
    type: 'POKEMONS_ALL',
    payload: pokemons
})

export const filterRestart = () => ({
    type: 'FILTER_RESTART'
})

export const filterType = (type) => ({
    type: 'FILTER_TYPE',
    payload: type
})

export const filterApi = (api) => ({
    type: 'FILTER_API',
    payload: api
})

export const filterOrder = (order) => ({
    type: 'FILTER_ORDER',
    payload: order
})

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    payload: page
})