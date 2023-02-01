import React from 'react'

export default function Filter({ all, state, setState }) {
    return (
        <div className='Row'>
            {all.map((option, index) =>
                <button key={index}
                    className={option === state ? 'Selected' : null}
                    onClick={() => setState(option)}
                >{option}</button>
            )}
        </div>
    )
}
