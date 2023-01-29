import React from 'react'
import { Link } from 'react-router-dom'

export default function Pokemon({ id, name, image, types }) {
    return (
        <div style={{ backgroundColor: '#8ceeff', margin: 2, borderRadius: '0.5rem', border: '2px solid #00dfdf' }}>
            <Link to={`/detail/${id}`}>
                <h5 style={{ margin: 0 }} >{name}</h5>
                <img src={image} alt={name} />
                <h5 style={{ margin: 0 }} >{types[0]}</h5>
                <h5 style={{ margin: 0 }} >{types[1]}</h5>
            </Link>
        </div>
    )
}
