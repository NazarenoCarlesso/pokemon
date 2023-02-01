import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiFilter, changePage, typesFilter } from '../redux/actions'
import Pokedex from './Pokedex'

export default function Home() {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemonPage)

    const [page, setPage] = React.useState([1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => dispatch(changePage(page[0])), [page])

    const typesAll = useSelector(state => state.typesAll)
    const [types, setTypes] = React.useState(typesAll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => dispatch(typesFilter(types)), [types])

    const originsAll = ['PokeAPI', 'Postgre']
    const [origins, setOrigins] = React.useState(originsAll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => dispatch(apiFilter(origins)), [origins])

    React.useEffect(() => setPage([1]), [types, origins])

    const handleType = (type) => {
        types.includes(type)
            ? setTypes(types.filter(t => t !== type))
            : setTypes([...types, type])
    }

    const handleOrigin = (origin) => {
        origins.includes(origin)
            ? setOrigins(origins.filter(o => o !== origin))
            : setOrigins([...origins, origin])
    }

    return (
        <div>
            <h1>Home</h1>
            <div className='Row'>
                {typesAll.map((type, index) =>
                    <button key={index}
                        className={types.includes(type) ? 'Selected' : null}
                        onClick={() => handleType(type)}
                    >{type}</button>
                )}
            </div>
            <div className='Row'>
                {originsAll.map((origin, index) =>
                    <button key={index}
                        className={origins.includes(origin) ? 'Selected' : null}
                        onClick={() => handleOrigin(origin)}
                    >{origin}</button>
                )}
            </div>
            <div className='Row'>
                <button onClick={() => setPage([page[0] - 1])}>{'<'}</button>
                {page}
                <button onClick={() => setPage([page[0] + 1])}>{'>'}</button>
            </div>
            <Pokedex pokemons={pokemons} />
        </div>
    )
}
