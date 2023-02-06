import React from 'react'
import Pokemon from './Pokemon'

export default function Pokedex({ pokemons = [] }) {
    // pokemons empty
    if (pokemons.length === 0) return (
        <div className='Center' style={{ height: '100%', flexDirection: 'column' }}>
            <img src='img/pikachu-running.gif' alt='pikachu' width={100} style={{ margin: 20 }} />
            <h5 style={{ color: '#FFF818' }}>Loading Pokemons...</h5>
        </div>
    )
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
