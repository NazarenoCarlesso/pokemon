const initialState = {
    pokemonAll: [],
    pokemonFilter: [],
    pokemonPage: []
}
const limit = 900

const reducer = (state = initialState, { type, payload }) => {
    // console.log(`reducer: ${type}`)
    switch (type) {
        case 'POKEMONS_ALL':
            console.log('%cpokemons loaded successfully', "color: cyan")
            return { ...state, pokemonAll: payload, pokemonFilter: payload }
        case 'FILTER_RESTART':
            // console.log('pokemons filter restart')
            return { ...state, pokemonFilter: state.pokemonAll }
        case 'FILTER_TYPE':
            if (payload === 'all') return { ...state }
            const filterType = state.pokemonFilter.filter(pokemon => pokemon.types.includes(payload))
            return { ...state, pokemonFilter: filterType }
        case 'FILTER_API':
            if (payload === 'existent') return { ...state, pokemonFilter: state.pokemonFilter.filter(p => p.id <= limit) }
            if (payload === 'created') return { ...state, pokemonFilter: state.pokemonFilter.filter(p => p.id > limit) }
            return { ...state }
        case 'FILTER_ORDER':
            if (payload === 'id +') return { ...state, pokemonFilter: state.pokemonFilter.sort((a, b) => a.id - b.id) }
            if (payload === 'id -') return { ...state, pokemonFilter: state.pokemonFilter.sort((a, b) => b.id - a.id) }
            if (payload === 'name +') return { ...state, pokemonFilter: state.pokemonFilter.sort((a, b) => a.name > b.name ? 1 : -1) }
            if (payload === 'name -') return { ...state, pokemonFilter: state.pokemonFilter.sort((a, b) => a.name > b.name ? -1 : 1) }
            if (payload === 'attack +') return { ...state, pokemonFilter: state.pokemonFilter.sort((a, b) => a.attack > b.attack ? 1 : -1) }
            if (payload === 'attack -') return { ...state, pokemonFilter: state.pokemonFilter.sort((a, b) => a.attack > b.attack ? -1 : 1) }
            return { ...state }
        case 'CHANGE_PAGE':
            // console.log('pokemons page change')
            const index = (payload - 1) * 12
            return { ...state, pokemonPage: state.pokemonFilter.slice(index, index + 12) }
        default:
            return { ...state }
    }
}

export default reducer