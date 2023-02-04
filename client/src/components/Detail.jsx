import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { typesColor } from '../utils' // eslint-disable-line no-unused-vars

export default function Detail() {
    // params Hook
    const { id } = useParams()
    // history Hook a.k.a. navigate
    const history = useHistory()
    // pokemon State
    const [pokemon, setPokemon] = useState({})
    // id Effect
    useEffect(() => {
        fetch(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.json())
            .then(data => setPokemon(data))
    }, [id])
    // pokemon Destructuring
    const { name, imageDetail, types, height, weight, health, attack, defense, speed } = pokemon
    // detail Render
    return (
        <div className='Page'>
            <div className='Row Center'>
                <div className='Paper' style={{ width: 360 }}>
                    <div className='Row'>
                        <h2 style={{ flexGrow: 1 }}>Height</h2>
                        <h2>{Math.floor(height / 10)}.{height % 10} m</h2>
                    </div>
                    <div className='Row'>
                        <h2 style={{ flexGrow: 1 }}>Weight</h2>
                        <h2>{Math.floor(weight / 10)}.{weight % 10} kg</h2>
                    </div>
                    <h2>Types</h2>
                    <h4>{types ? types.join(' ') : null}</h4>
                    <h2>Stats</h2>
                    <div className='Row' style={{ alignItems: 'center' }}>
                        <h4 style={{ width: 70 }}>Health</h4>
                        <div className='BarContainer'>
                            <div className='Bar' style={{ width: `${health / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : 'blue'}` }} />
                        </div>
                        <h2>{health}</h2>
                    </div>
                    <div className='Row' style={{ alignItems: 'center' }}>
                        <h4 style={{ width: 70 }}>Attack</h4>
                        <div className='BarContainer'>
                            <div className='Bar' style={{ width: `${attack / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : 'blue'}` }} />
                        </div>
                        <h2>{attack}</h2>
                    </div>
                    <div className='Row' style={{ alignItems: 'center' }}>
                        <h4 style={{ width: 70 }}>Defense</h4>
                        <div className='BarContainer'>
                            <div className='Bar' style={{ width: `${defense / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : 'blue'}` }} />
                        </div>
                        <h2>{defense}</h2>
                    </div>
                    <div className='Row' style={{ alignItems: 'center' }}>
                        <h4 style={{ width: 70 }}>Speed</h4>
                        <div className='BarContainer'>
                            <div className='Bar' style={{ width: `${speed / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : 'blue'}` }} />
                        </div>
                        <h2>{speed}</h2>
                    </div>
                    <button onClick={() => history.push(`/detail/${Number(id) - 1}`)} >{'<'}</button>
                    <button onClick={() => history.push(`/detail/${Number(id) + 1}`)} >{'>'}</button>
                </div>
                <div>
                    <div className='PokemonBar' >
                        <h1 style={{ margin: 0 }}>{name} N.° {id}</h1>
                    </div>
                    <img src={imageDetail} alt={name} />
                </div>
            </div>
        </div>
    )
}
