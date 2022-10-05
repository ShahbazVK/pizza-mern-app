import React from 'react'
import { NavLink } from 'react-router-dom'

export const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to='/'>PizzaDay</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to='/'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/about'>About us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/contact'>Contact us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/terms'>Terms and policy</NavLink>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown link
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to='/'>Action</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='/'>Another action</NavLink></li>
                                    <li><NavLink className="dropdown-item" to='/'>Something else here</NavLink></li>
                                </ul>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
