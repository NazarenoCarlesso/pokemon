export const pokemonsAll = (pokemons) => ({
    type: 'POKEMONS_ALL',
    payload: pokemons
})

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    payload: page
})