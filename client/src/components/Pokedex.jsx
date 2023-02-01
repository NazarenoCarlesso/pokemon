import React from 'react'
import Pokemon from './Pokemon'

export default function Pokedex({ pokemons = [] }) {
    return (
        <div style={{ display: 'flex', width: '100vw', flexFlow: 'wrap' }}>
            {pokemons.map(p => <Pokemon key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />)}
        </div>
    )
}
