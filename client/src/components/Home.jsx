import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changePage, filterApi, filterOrder, filterRestart, filterType } from '../redux/actions'
import { apis, orders, types } from '../utils'
import Filter from './Filter'
import Pokedex from './Pokedex'

export default function Home() {
    // dispatch Hook
    const dispatch = useDispatch()
    // history Hook a.k.a. navigate
    const history = useHistory()
    // selector Hook
    const pokemons = useSelector(state => state.pokemonPage)
    // input State
    const [input, setInput] = useState('')
    // filter States
    const [type, setType] = useState('all')
    const [api, setApi] = useState('all')
    const [order, setOrder] = useState('id +')
    // page State
    const [page, setPage] = useState([1])
    // filter Effect
    useEffect(() => {
        dispatch(filterRestart())
        dispatch(filterType(type))
        dispatch(filterApi(api))
        dispatch(filterOrder(order))
        setPage([1])
    }, [dispatch, type, api, order])
    // page Effect
    useEffect(() => dispatch(changePage(page[0])), [dispatch, page])
    // input Handlers
    const handleChange = (event) => setInput(event.target.value)
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }
    const handleSearch = async () => {
        setInput('')
        const pokemon = await fetch(`http://localhost:3001/pokemons?name=${input.toLowerCase()}`)
            .then(response => response.json())
            .then(data => data[0])
        // si el pokemon existe
        if (pokemon) history.push(`/detail/${pokemon.id}`)
        else window.alert(`Sorry, we couldn't find the pokemon "${input}"`)
    }
    // reset Handler
    const handleReset = () => {
        setType('all')
        setApi('all')
        setOrder('id +')
    }
    // home Render
    return (
        <div className='Page'>
            <h1>Home</h1>
            <div className='Row'>
                <div>
                    {/* search */}
                    <div className='Paper' style={{ width: 360 }}>
                        <h5 style={{ margin: 0, marginBottom: 6 }}>Search a pokemon by it's name</h5>
                        <div className='Row'>
                            <input className='Input' value={input} type='search'
                                onChange={handleChange} onKeyDown={handleKeyDown}
                                style={{ marginRight: 10, flexGrow: 1 }} />
                            <button className='Button' onClick={handleSearch}>
                                <h4>SEARCH</h4>
                            </button>
                        </div>
                    </div>
                    {/* filtros */}
                    <div className='Paper' style={{ width: 360 }}>
                        <Filter name='Type' all={types} state={type} setState={setType} />
                        <Filter name='API' all={apis} state={api} setState={setApi} />
                        <Filter name='Order' all={orders} state={order} setState={setOrder} />
                        <div className='Center'>
                            <button className='Button' onClick={handleReset}>
                                <h4>RESET</h4>
                            </button>
                        </div>
                    </div>
                    {/* paginado */}
                    <div className='Paper Row' style={{ width: 360 }}>
                        <button onClick={() => setPage([page[0] - 1])}>{'<'}</button>
                        {page}
                        <button onClick={() => setPage([page[0] + 1])}>{'>'}</button>
                    </div>
                </div>
                <div style={{ height: 350 }}>
                    {/* pokedex */}
                    <div className='Paper' style={{ width: 624, height: 311 }}>
                        <Pokedex pokemons={pokemons} />
                    </div>
                </div>
            </div>
        </div>
    )
}
