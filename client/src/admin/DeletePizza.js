import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const DeletePizza = () => {
    const location = useLocation()
    const naviagte = useNavigate()

    useEffect(() => {
        const { id } = location.state
        axios.delete(`/api/pizzas/order/deletepizza/${id}`)
            .then((resp) => {
                naviagte("/admin")

            })
            .catch((err) => console.log(err))
    }, [naviagte, location.state])

    return null
}
