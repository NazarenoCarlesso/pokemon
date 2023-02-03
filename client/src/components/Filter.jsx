import React from 'react'

export default function Filter({ name, all, state, setState }) {
    // filtro reutilizable
    // agregar className={} para cambiar los estilos
    return (
        <div className='Row Filter'>
            <h5 style={{ margin: 0, marginRight: 6, alignSelf: 'center' }}>{name}</h5>
            {all.map((option, index) =>
                <button
                    key={index}
                    className={option.value === state ? 'Selected' : null}
                    onClick={() => setState(option.value)}
                    style={{ color: option.color }}
                >{option.value}</button>
            )}
        </div>
    )
}
