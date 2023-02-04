import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div style={{ position: 'fixed', top: 0, width: '100%' }}>
            <div className='Row' style={{ backgroundColor: '#001b3c' }}>
                <h3 style={{ flexGrow: 1 }}>POKEMON</h3>
                <NavLink to='/home'>
                    <h3>Home</h3>
                </NavLink>
                <NavLink to='/create'>
                    <h3>Create</h3>
                </NavLink>
                <NavLink to='/about'>
                    <h3>About</h3>
                </NavLink>
            </div>
        </div>
    )
}
