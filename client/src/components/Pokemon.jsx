import React from 'react'

export default function Pokemon({ name, image, types }) {
    return (
        <div style={{ backgroundColor: '#8ceeff', margin: 2, borderRadius: '0.5rem', border: '2px solid #00dfdf' }}>
            <h5 style={{ margin: 0 }} >{name}</h5>
            <img src={image} alt={name} />
            {types.map(type => <h5 style={{ margin: 0 }} >{type}</h5>)}
        </div>
    )
}
