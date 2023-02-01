import React from 'react'

export default function Filter({ all, state, setState }) {
    // filtro reutilizable
    // agregar className={} para cambiar los estilos
    return (
        <div className='Row'>
            {all.map((option, index) =>
                <button
                    key={index}
                    className={option === state ? 'Selected' : null}
                    onClick={() => setState(option)}
                >{option}</button>
            )}
        </div>
    )
}
