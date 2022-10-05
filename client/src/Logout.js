import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { logoutAction } from './actions/loginAction'

export const Logout = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch()
    localStorage.removeItem("currentuser")
    dispatch(logoutAction())
    useEffect(() => {
        // navigate("/login");
        window.location.href = "/"
    }, [])

    return null
}
