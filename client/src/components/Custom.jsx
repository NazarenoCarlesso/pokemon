import React from 'react'

export function Stat({ stat, value }) {
    return (
        <div className='Row'>
            <div style={{ width: '30%', backgroundColor: '#1e1e1e', border: '1px solid #0000000d' }}>
                <h3 style={{ fontWeight: 500 }}>{stat}</h3>
            </div>
            <div style={{ width: '70%', backgroundColor: '#2e2e2e', border: '1px solid #0000000d' }}>
                <h3 style={{ fontWeight: 500 }}>{value}</h3>
            </div>
        </div>
    )
}