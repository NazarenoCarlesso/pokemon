import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changePage, filterApi, filterOrder, filterRestart, filterType } from '../redux/actions'
import { apis, orders, types } from '../utils'
import { regexAlphabet } from '../utils/validation'
import Filter from './Filter'
import Pokedex from './Pokedex'
// BACK API URL
const BACK = process.env.REACT_APP_BACK

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
    const handleChange = (event) =>
        regexAlphabet.test(event.target.value) ? setInput(event.target.value) : null
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }
    // search Handler
    const handleSearch = async () => {
        setInput('')
        const pokemon = await fetch(`${BACK}/pokemons?name=${input.toLowerCase()}`)
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
    // selector Hook
    const pokemonsFilter = useSelector(state => state.pokemonFilter.length)
    // results State
    const [results, setResults] = useState(pokemonsFilter)
    // totalPages State
    const [totalPages, setTotalPages] = useState([1])
    // pages State
    const [pages, setPages] = useState([1])
    // pokemonsFilter Effect
    useEffect(() => setResults(pokemonsFilter), [pokemonsFilter])
    useEffect(() => setTotalPages(Math.ceil(pokemonsFilter / 12)), [pokemonsFilter])
    // paginate Effect
    useEffect(() => {
        const array = []
        for (let i = 1; i <= totalPages; i++) array.push(i)
        const left = page[0] <= 5
        const right = totalPages - page[0] <= 4
        // console.log(`left: ${left}, right: ${right}`)
        if (!left && !right) setPages(array.slice(page[0] - 5, page[0] + 4))
        if (left && !right) setPages(array.slice(0, 9))
        if (!left && right) setPages(array.slice(-9))
        if (left && right) setPages(array)
    }, [totalPages, page])
    // paginate Handlers
    const handlePrevPage = () => page[0] !== 1 ? setPage([page[0] - 1]) : null
    const handleNextPage = () => page[0] !== totalPages ? setPage([page[0] + 1]) : null
    // home Render
    return (
        <div className='Page'>
            <div className='Spacing'/>
            <div className='Row Center' style={{ width: '100%' }}>
                <div className='Line' style={{ marginRight: 10 }} />
                <h1 style={{ color: '#cc1f1f', textShadow: '0px 0px 12px #cc1f1f' }}>POKEDEX</h1>
                <div className='Line' style={{ marginLeft: 10 }} />
            </div>
            <div className='Row Flex'>
                <div>
                    {/* search */}
                    <div className='Paper Center' style={{ width: 360, height: 34 }}>
                        <h5 style={{ margin: 0, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <img src='img/search.svg' alt='search' style={{ height: 14, marginRight: 4 }} />
                            Pokemon Search
                        </h5>
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
                    <div className='Paper Center' style={{ width: 360, height: 246, flexDirection: 'column' }}>
                        <div>
                            <Filter name='Type' all={types} state={type} setState={setType} />
                            <Filter name='API' all={apis} state={api} setState={setApi} />
                            <Filter name='Order' all={orders} state={order} setState={setOrder} />
                        </div>
                        <div className='Row Center'>
                            <button className='Button' onClick={handleReset}>
                                <h4>RESET</h4>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* pokedex */}
                    <div className='Paper Pokedex'>
                        <Pokedex pokemons={pokemons} />
                    </div>
                </div>
            </div>
            {/* paginado */}
            <div className='Row Center' style={{ width: '100%' }}>
                <div className='Line' style={{ marginRight: 10 }} />
                <div className='Paper Center' style={{ minWidth: 360, width: 360, flexDirection: 'column' }}>
                    <div className='Row' style={{ flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%' }}>
                        <h5 style={{ fontWeight: 400 }}>Pokemons found: <b>{results}</b></h5>
                        <h5 style={{ fontWeight: 400 }}>Total pages: <b>{totalPages}</b></h5>
                    </div>
                    <div className='Row' style={{ marginTop: 6 }} >
                        <button className='Paginate' onClick={handlePrevPage}>{'<'}</button>
                        {pages.map((p, index) =>
                            <button className={`Paginate ${p === page[0] ? 'Current' : ''}`} key={index} onClick={() => setPage([p])} >{p}</button>
                        )}
                        <button className='Paginate' onClick={handleNextPage}>{'>'}</button>
                    </div>
                </div>
                <div className='Line' style={{ marginLeft: 10 }} />
            </div>
        </div>
    )
}
