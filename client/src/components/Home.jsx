import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../redux/actions'
import Pokedex from './Pokedex'

export default function Home() {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemonPage)
    const [page, setPage] = React.useState(1)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => dispatch(changePage(page)), [page])

    return (
        <div>
            <h1>Home</h1>
            <div className='Row'>
                <button onClick={() => setPage(page - 1)}>{'<'}</button>
                {page}
                <button onClick={() => setPage(page + 1)}>{'>'}</button>
            </div>
            <Pokedex pokemons={pokemons} />
        </div>
    )
}
