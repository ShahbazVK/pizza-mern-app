import React, { useEffect } from 'react'
import { Container, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from './actions/loginAction'

export const SubNavbar = () => {
    const dispatch = useDispatch()
    // const [currentuser, setcurrentuser] = useState('')
    const cartLength = useSelector((state) => state.cartReducer.cartItem.length)
    const currentuser = useSelector((state) => state.loginReducer.user.username)

    useEffect(() => {
        if (localStorage.getItem("currentuser")) {
            dispatch(loginAction(JSON.parse(localStorage.getItem("currentuser"))))
            // setcurrentuser((JSON.parse(localStorage.getItem("currentuser"))).username)
        }
        // setcurrentuser(username)

    }, [dispatch])
    // const currentuser = useSelector((state) => state.loginReducer.user.username)


    return (
        <div>
            <nav style={{ backgroundColor: "#dbd7cc", fontSize: "17px", fontWeight: "bold" }} className="navbar navbar-expand-lg navbar-light">
                <Container>
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Image style={{ height: "70%", width: "70%" }} src='images/mainlogo.png' />
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
                            <ul className="navbar-nav ms-auto">
                                {
                                    !currentuser ?
                                        <>
                                            <li className="nav-item">
                                                <NavLink style={{ color: "black" }} className="nav-link" to='/login'>{currentuser}Login</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={{ color: "black" }} className="nav-link" to='/register'>Register</NavLink>
                                            </li>
                                        </> :
                                        <>
                                            <li className="nav-item">
                                                <NavLink style={{ color: "black" }} className="nav-link" to='/'>{currentuser}</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={{ color: "black" }} className="nav-link" to='/orders'>Orders</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink style={{ color: "black" }} className="nav-link" to='/logout'>Logout</NavLink>
                                            </li>
                                        </>
                                }
                                <li className="nav-item">
                                    <NavLink style={{ color: "black" }} className="nav-link" to='/cart'>Cart {currentuser ? cartLength : ""}</NavLink>

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
                </Container>
            </nav>
        </div>
    )
}
