import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { typesColor } from '../utils' // eslint-disable-line no-unused-vars
// BACK API URL
const BACK = process.env.REACT_APP_BACK

export default function Detail() {
    // params Hook
    const { id } = useParams()
    // history Hook a.k.a. navigate
    const history = useHistory()
    // pokemon State
    const [pokemon, setPokemon] = useState({})
    // id Effect
    useEffect(() => {
        fetch(`${BACK}/pokemons/${id}`)
            .then(response => {
                if (!response.ok) throw new Error(response.statusText)
                return response.json()
            })
            .catch(error => {
                window.alert(error)
                history.goBack()
            })
            .then(data => data ? setPokemon(data) : null)
    }, [history, id])
    // pokemon Destructuring
    const { name, imageDetail, types, height, weight, health, attack, defense, speed } = pokemon
    // detail Render
    return (
        <div className='Page'>
            <div className='Row Center'>
                <div>
                    <div className='Paper Row'>
                        <div className='PokemonBar'>
                            <h1 style={{ margin: 0 }}>{name ? name.charAt(0).toUpperCase() + name.slice(1) : null} N.° {id}</h1>
                        </div>
                        <div style={{ flexGrow: 1 }} />
                        <div className='Center'>
                            <button className='Arrow' onClick={() => history.push(`/detail/${Number(id) - 1}`)} >{'<'}</button>
                            <img src='../img/pokeball_icon.png' alt='pokeball_icon' style={{ height: 32, margin: '0px 4px' }} />
                            <button className='Arrow' onClick={() => history.push(`/detail/${Number(id) + 1}`)} >{'>'}</button>
                        </div>
                    </div>
                    <div className='Paper' style={{ width: 360 }}>
                        <div className='Row'>
                            <h2 style={{ flexGrow: 1 }}>Height</h2>
                            <h2>{Math.floor(height / 10)}.{height % 10} m</h2>
                        </div>
                        <hr />
                        <div className='Row'>
                            <h2 style={{ flexGrow: 1 }}>Weight</h2>
                            <h2>{Math.floor(weight / 10)}.{weight % 10} kg</h2>
                        </div>
                        <hr />
                        <h2>Types</h2>
                        <div className='Row' style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: 10, marginBottom: 10 }} >
                            {types ? types.map((type, index) =>
                                <div className='Row'>
                                    <div key={index} className='Type Row' style={{ backgroundColor: typesColor[type], boxShadow: `0px 0px 4px 1px ${typesColor[type]}7e` }}>
                                        <img src={`../img/types/${type}.svg`} alt={type} style={{ width: 24 }} />
                                    </div>
                                    <h2 style={{ marginLeft: 6, color: `${typesColor[type]}` }}>{type}</h2>
                                </div>
                            ) : null}
                        </div>
                        <hr />
                        <h2>Stats</h2>
                        <div style={{ marginTop: 10, marginBottom: 10 }}>
                            <div className='Row' style={{ alignItems: 'center' }}>
                                <h4 style={{ width: 70 }}>Health</h4>
                                <div className='BarContainer'>
                                    <div className='Bar' style={{ width: `${health / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : '#0066ff'}` }} />
                                </div>
                                <h2>{health}</h2>
                            </div>
                            <div className='Row' style={{ alignItems: 'center' }}>
                                <h4 style={{ width: 70 }}>Attack</h4>
                                <div className='BarContainer'>
                                    <div className='Bar' style={{ width: `${attack / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : '#0066ff'}` }} />
                                </div>
                                <h2>{attack}</h2>
                            </div>
                            <div className='Row' style={{ alignItems: 'center' }}>
                                <h4 style={{ width: 70 }}>Defense</h4>
                                <div className='BarContainer'>
                                    <div className='Bar' style={{ width: `${defense / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : '#0066ff'}` }} />
                                </div>
                                <h2>{defense}</h2>
                            </div>
                            <div className='Row' style={{ alignItems: 'center' }}>
                                <h4 style={{ width: 70 }}>Speed</h4>
                                <div className='BarContainer'>
                                    <div className='Bar' style={{ width: `${speed / 300 * 100}%`, height: '100%', backgroundColor: `${types ? typesColor[types[0]] : '#0066ff'}` }} />
                                </div>
                                <h2>{speed}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={imageDetail} alt={name} />
                </div>
            </div>
        </div>
    )
}
