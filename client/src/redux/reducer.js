const initialState = {
    pokemonAll: [],
    pokemonPage: []
}

const reducer = (state = initialState, { type, payload }) => {
    console.log(`reducer: ${type}`)
    switch (type) {
        case 'POKEMONS_ALL':
            return { ...state, pokemonAll: payload }
        case 'CHANGE_PAGE':
            const start = payload * 12
            const end = payload * 12 + 12
            return {
                ...state,
                pokemonPage: state.pokemonAll.slice(start, end)
            }
        default:
            return { ...state }
    }
}

export default reducer