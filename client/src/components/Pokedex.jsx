import React from 'react'
import Pokemon from './Pokemon'

export default function Pokedex({ pokemons = [] }) {
    // pokedex Render
    return (
        <div style={{ display: 'flex', width: '100%', flexFlow: 'wrap' }}>
            {pokemons.map(p =>
                <Pokemon key={p.id} id={p.id} name={p.name}
                    image={p.imagePokedex} types={p.types} />
            )}
        </div>
    )
}
