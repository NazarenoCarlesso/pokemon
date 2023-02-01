import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, filterApi, filterOrder, filterRestart, filterType } from '../redux/actions'
import Filter from './Filter'
import Pokedex from './Pokedex'

export default function Home() {
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemonPage)

    const [page, setPage] = React.useState([1])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => dispatch(changePage(page[0])), [page])

    const types = ['all', 'normal', 'fighting', 'flying', 'poison', 'ground',
        'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric',
        'psychic', 'ice', 'dragon', 'dark', 'fairy', 'shadow']
    const apis = ['all', 'existent', 'created']
    const orders = ['id +', 'id -', 'name +', 'name -', 'attack +', 'attack -']

    const [type, setType] = useState('all')
    const [api, setApi] = useState('all')
    const [order, setOrder] = useState('id +')

    useEffect(() => {
        dispatch(filterRestart())
        dispatch(filterType(type))
        dispatch(filterApi(api))
        dispatch(filterOrder(order))
        setPage([1])
    }, [dispatch, type, api, order])

    return (
        <div>
            <h1>Home</h1>
            <Filter all={types} state={type} setState={setType} />
            <Filter all={apis} state={api} setState={setApi} />
            <Filter all={orders} state={order} setState={setOrder} />
            <div className='Row'>
                <button onClick={() => setPage([page[0] - 1])}>{'<'}</button>
                {page}
                <button onClick={() => setPage([page[0] + 1])}>{'>'}</button>
            </div>
            <Pokedex pokemons={pokemons} />
        </div>
    )
}
