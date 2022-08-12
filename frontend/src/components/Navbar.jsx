import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div>
        <nav>
            <NavLink to='/dashboard'>dashboard</NavLink>
            <NavLink to='/'>home</NavLink>
        </nav>
    </div>
  )
}
