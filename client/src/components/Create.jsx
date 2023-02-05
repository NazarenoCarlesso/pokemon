import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { typesSelect } from '../utils'
import postPokemon from '../utils/request'
import validate from '../utils/validation'
// BACK API URL
const BACK = process.env.REACT_APP_BACK
// Nombre *, imagePokedex * imageDetail *, Vida, Ataque, Defensa,
// Velocidad, Altura, Peso, Tipos
export default function Create() {
    // pokemon State
    const [pokemon, setPokemon] = useState({
        name: '',
        imagePokedex: '',
        imageDetail: '',
        types: [undefined, undefined],
        height: '',
        weight: '',
        health: '',
        attack: '',
        defense: '',
        speed: ''
    })
    // error State
    const [error, setError] = useState('Error')
    // pokemon Effect: valida el pokemon cada vez que cambia
    useEffect(() => setError(validate(pokemon)), [pokemon])
    // handle pokemon Changes
    const handleChange = (event) => {
        const { name, value } = event.target
        setPokemon({ ...pokemon, [name]: value })
    }
    // handle pokemon Submit
    const handleSubmit = (event) => {
        event.preventDefault()
        // error
        if (error) return window.alert(error)
        // valid
        fetch(`${BACK}/pokemons`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postPokemon(pokemon))
        })
    }
    // create Render
    return (
        <div className='Page'>
            <h1>Create Pokemon</h1>
            <div className='Paper Center' style={{ width: 360 }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid' }}>
                    <label className='Label'>
                        <span>Name:</span>
                        <input
                            className='Input'
                            value={pokemon.name}
                            onChange={handleChange}
                            name='name'
                            type='text'
                        />
                    </label>
                    <label className='Label Large'>
                        <span>Pokedex Image Url:</span>
                        <input
                            className='Input'
                            value={pokemon.imagePokedex}
                            onChange={handleChange}
                            name='imagePokedex'
                            type='url'
                        />
                    </label>
                    <label className='Label Large'>
                        <span>Detail Image Url:</span>
                        <input
                            className='Input'
                            value={pokemon.imageDetail}
                            onChange={handleChange}
                            name='imageDetail'
                            type='url'
                        />
                    </label>
                    <div className='Row'>
                        <label className='Label'>
                            <span>Primary:</span>
                            <select
                                className='Select'
                                value={pokemon.types[0]}
                                onChange={event => handleChange({
                                    target: {
                                        name: event.target.name,
                                        value: [event.target.value, pokemon.types[1]]
                                    }
                                })}
                                name='types'>
                                {typesSelect.map((type, index) =>
                                    <option key={index} value={type}>{type}</option>
                                )}
                            </select>
                        </label>
                        <label className='Label'>
                            <span>Secondary:</span>
                            <select
                                className='Select'
                                value={pokemon.types[1]}
                                onChange={event => handleChange({
                                    target: {
                                        name: event.target.name,
                                        value: [pokemon.types[0], event.target.value]
                                    }
                                })}
                                name='types'>
                                {typesSelect.map((type, index) =>
                                    <option key={index} value={type}>{type}</option>
                                )}
                            </select>
                        </label>
                    </div>
                    <div className='Row'>
                        <label className='Label Small'>
                            <span>Height:</span>
                            <input
                                className='Input'
                                value={pokemon.height}
                                onChange={handleChange}
                                name='height'
                                type='number'
                            />
                        </label>
                        <label className='Label Small'>
                            <span>Weight:</span>
                            <input
                                className='Input'
                                value={pokemon.weight}
                                onChange={handleChange}
                                name='weight'
                                type='number'
                            />
                        </label>
                    </div>
                    <div className='Row'>
                        <label className='Label Small'>
                            <span>Health:</span>
                            <input
                                className='Input'
                                value={pokemon.health}
                                onChange={handleChange}
                                name='health'
                                type='number'
                            />
                        </label>
                        <label className='Label Small'>
                            <span>Attack:</span>
                            <input
                                className='Input'
                                value={pokemon.attack}
                                onChange={handleChange}
                                name='attack'
                                type='number'
                            />
                        </label>
                    </div>
                    <div className='Row'>
                        <label className='Label Small'>
                            <span>Defense:</span>
                            <input
                                className='Input'
                                value={pokemon.defense}
                                onChange={handleChange}
                                name='defense'
                                type='number'
                            />
                        </label>
                        <label className='Label Small'>
                            <span>Speed:</span>
                            <input
                                className='Input'
                                value={pokemon.speed}
                                onChange={handleChange}
                                name='speed'
                                type='number'
                            />
                        </label>
                    </div>
                    <div className='Center'>
                        <button className='Button' type='submit'>
                            <h2 style={{ fontWeight: 400 }}>SUBMIT</h2>
                        </button>
                    </div>
                </form>
            </div>
            <div className='Paper'>
                <h4>{error}</h4>
            </div>
        </div>
    )
}
