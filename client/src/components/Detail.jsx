import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Stat } from './Custom'

export default function Detail() {
    const { id } = useParams()
    const history = useHistory()

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.json())
            .then(data => setPokemon(data))
    }, [id])

    // useEffect(() => console.log(pokemon), [pokemon])

    const { name, imageDetail, types, height, weight, health, attack, defense, speed } = pokemon
    return (
        <div className='Row'>
            <div style={{ width: 300 }}>
                <Stat stat='Type' value={types ? types.join(' ') : undefined} />
                <Stat stat='Height' value={`${height} m`} />
                <Stat stat='Weight' value={`${weight} kg`} />
                <Stat stat='Health' value={health} />
                <Stat stat='Attack' value={attack} />
                <Stat stat='Defense' value={defense} />
                <Stat stat='Speed' value={speed} />
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
    )
}
