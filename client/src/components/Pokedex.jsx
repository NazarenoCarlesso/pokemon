import React, { useEffect, useState } from 'react'
import Pokemon from './Pokemon'

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/pokemons')
            .then(response => response.json())
            .then(data => setPokemons(data))
    }, [])

    useEffect(() => console.log(pokemons), [pokemons])

    return (
        <div style={{ display: 'flex', width: '100vw', flexFlow: 'wrap' }}>
            {pokemons.map(p => <Pokemon key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />)}
        </div>
    )
}
