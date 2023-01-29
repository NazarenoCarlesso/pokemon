import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

export default function Detail() {
    const { id } = useParams()
    const history = useHistory()

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.json())
            .then(data => setPokemon(data))
    }, [id])

    useEffect(() => console.log(pokemon), [pokemon])

    const { name, image, types, height, weight, health, attack, defense, speed } = pokemon
    return (
        <div>
            <button onClick={() => history.push(`/detail/${Number(id) - 1}`)} >{'<'}</button>
            <button onClick={() => history.push(`/detail/${Number(id) + 1}`)} >{'>'}</button>
            <h2>{id}: {name}</h2>
            <img src={image} alt={name} />
            <h4>{types ? types[0] : null} {types ? types[1] : null}</h4>
            <h5>Height: {height}</h5>
            <h5>Weight: {weight}</h5>
            <h5>Health: {health}</h5>
            <h5>Attack: {attack}</h5>
            <h5>Defense: {defense}</h5>
            <h5>Speed: {speed}</h5>
        </div>
    )
}
