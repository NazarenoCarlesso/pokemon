import React from 'react'
import { Link } from 'react-router-dom'
import { typesColor } from '../utils'

export default function Pokemon({ id, name, image, types }) {
    // pokemon Render
    return (
        <div className='Pokemon'>
            <Link to={`/detail/${id}`}>
                <h5 style={{ margin: 0 }} >{name}</h5>
                <img src={image} alt={name} />
                <div className='Row' style={{ justifyContent: 'space-evenly', marginBottom: 4 }}>
                    {types.map((type, index) =>
                        <div key={index} className='Type' style={{ backgroundColor: typesColor[type], boxShadow: `0px 0px 4px 1px ${typesColor[type]}7e` }}>
                            <img src={`img/types/${type}.svg`} alt={type} style={{ width: 16 }} />
                        </div>
                    )}
                </div>
            </Link>
        </div>
    )
}
