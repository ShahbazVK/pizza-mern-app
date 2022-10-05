import React from 'react'
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { orderAction } from './actions/orderAction';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export const Checkout = ({ subtotal }) => {
    const dispatch = useDispatch()
    const currentuser = useSelector((state) => state.loginReducer.user)
    const cartItem = useSelector((state) => state.cartReducer.cartItem)
    const tokenHandler = (token) => {
        dispatch(orderAction(token, currentuser, cartItem, subtotal))
        axios.post("/api/pizzas/order/placeorder", { token, currentuser, cartItem, subtotal })
    }
    return (
        <StripeCheckout
            amount={subtotal * 100}
            shippingAddress
            token={tokenHandler}
            stripeKey="pk_test_51Lo6PUHWs13Ra00Lh1oRlSBwcLDVWAFp6dJROnp5Es3fEls4KvktkMa9J4wJp1cvix20VcyjsfF1Id32oxXPqEUD00yMcnxqKu"
            currency='INR'
        >
            <Button>Pay now</Button>
        </StripeCheckout>
    )
}
