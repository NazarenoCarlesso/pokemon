import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className='NavBar'>
            <div className='Row'>
                {/* Logo */}
                <img className='Logo' src='img/logo.svg' alt='logo' />
                <div style={{ flexGrow: 0 }} />
                {/* Navigate */}
                <NavLink className='NavH' to='/home'>
                    <h3>Home</h3>
                </NavLink>
                <NavLink className='NavH' to='/create'>
                    <h3>Create</h3>
                </NavLink>
                <NavLink className='NavH' to='/about'>
                    <h3>About</h3>
                </NavLink>
            </div>
        </div>
    )
}
