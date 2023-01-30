import React from 'react'

export function Stat({ stat, value }) {
    return (
        <div className='Row'>
            <div style={{ width: '30%', backgroundColor: '#cdcdcd', border: '1px solid #0000000d' }}>
                <h3 style={{ fontWeight: 500 }}>{stat}</h3>
            </div>
            <div style={{ width: '70%', backgroundColor: '#f5f5f5', border: '1px solid #0000000d' }}>
                <h3 style={{ fontWeight: 500 }}>{value}</h3>
            </div>
        </div>
    )
}