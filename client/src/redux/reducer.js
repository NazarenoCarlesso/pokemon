const initialState = {
    pokemonAll: [],
    pokemonFilter: [],
    pokemonPage: [],
    typesAll: []
}

const reducer = (state = initialState, { type, payload }) => {
    console.log(`reducer: ${type}`)
    switch (type) {
        case 'POKEMONS_ALL':
            return { ...state, pokemonAll: payload }
        case 'TYPES_ALL':
            return { ...state, typesAll: payload }
        case 'TYPES_FILTER':
            const typesFilter = state.pokemonAll.filter(pokemon =>
                pokemon.types.some(t => payload.includes(t)))
            return { ...state, pokemonFilter: typesFilter }
        case 'API_FILTER':
            if (payload.length === 2) return { ...state, pokemonFilter: state.pokemonAll }
            if (payload[0] === 'PokeAPI') return { ...state, pokemonFilter: state.pokemonAll.filter(p => p.id <= 600) }
            if (payload[0] === 'Postgre') return { ...state, pokemonFilter: state.pokemonAll.filter(p => p.id > 600) }
            return { ...state, pokemonFilter: [] }
        case 'CHANGE_PAGE':
            payload = payload - 1
            const start = payload * 12
            const end = payload * 12 + 12
            return {
                ...state,
                pokemonPage: state.pokemonFilter.slice(start, end)
            }
        default:
            return { ...state }
    }
}

export default reducer