import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { pokemonsAll } from '../redux/actions'

export default function Landing() {
    // dispatch Hook
    const dispatch = useDispatch()
    // Load Pokemons Effect
    useEffect(() => {
        fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .then(pokemons => dispatch(pokemonsAll(pokemons)))
    })
    // landing Render
    return (
        <div className='Row'>
            <div>
                <h1 style={{ fontSize: '3rem' }}>Gotta Catch Them All!</h1>
                <Link to='/home'>
                    <button className='Discover'>
                        <img src='img/pokeball_icon.png' alt='pokeball_icon' style={{ height: 18, marginRight: 6 }} />
                        DISCOVER
                    </button>
                </Link>
            </div>
            <div>
                <img src='img/lucario.png' alt='lucario' />
            </div>
        </div>
    )
}
