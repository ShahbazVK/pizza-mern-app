import React, { useEffect } from 'react'
import { Row, Col, Image, Button } from 'react-bootstrap'
import { MinusSquareOutlined, PlusSquareOutlined, DeleteFilled } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { sendCartAction } from './actions/cartAction'
import { useState } from 'react'
import { Checkout } from './Checkout'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentuser = useSelector((state) => state.loginReducer.user.username)
    const [subtotal, setsubtotal] = useState(0)
    const totalFunc = () => {
        let totalVar = 0
        for (let i = 0; i < data.cartItem.length; i++) {
            totalVar += data.cartItem[i].quantity * data.cartItem[i].price
        }
        setsubtotal(totalVar)
    }
    useEffect(() => {
        if (currentuser === "") navigate("/")
        if (!localStorage.getItem("cartItem")) localStorage.setItem('cartItem', JSON.stringify([]))
        else {
            dispatch(sendCartAction(JSON.parse(localStorage.getItem('cartItem'))))
        }
        //forsub total
        totalFunc()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const data = useSelector((state) => state.cartReducer)
    const quantityChange = (key, operation) => {
        if (operation === 'increment') {
            data.cartItem[key].quantity += 1
            dispatch(sendCartAction(data.cartItem))
            localStorage.setItem('cartItem', JSON.stringify(data.cartItem))
        }
        else if (operation === 'decrement') {
            data.cartItem[key].quantity -= 1
            dispatch(sendCartAction(data.cartItem))
            localStorage.setItem('cartItem', JSON.stringify(data.cartItem))
        }
        else if (operation === 'delete') {
            delete data.cartItem[key]
            data.cartItem.splice(key, 1);
            dispatch(sendCartAction(data.cartItem))
            localStorage.setItem('cartItem', JSON.stringify(data.cartItem))
        }
        totalFunc()
    }

    return (
        <div style={{ paddingTop: "20px" }}>
            <Row style={{ textAlign: "center" }}>
                <Col><h2>My Cart</h2>
                    {data.cartItem.map((element, key) => {
                        if (element !== -1) {
                            return (
                                <Row key={key}>
                                    <Col>
                                        <h5>{element.name}</h5>
                                        <p>Price: RS {element.price} X {element.quantity}</p>
                                        <p><Button onClick={() => quantityChange(key, 'decrement')} variant="light"><MinusSquareOutlined style={{ fontSize: "20px", color: "red" }} /></Button>&nbsp; Quantity: {element.quantity}&nbsp;<Button onClick={() => quantityChange(key, 'increment')} variant="light"><PlusSquareOutlined style={{ fontSize: "20px", color: "blue" }} /></Button></p>

                                        <hr />
                                    </Col>
                                    <Col>
                                        <Image style={{ width: "10rem", height: "6.7rem", marginRight: "1.5rem" }} src={element.image} />
                                        <Button onClick={() => quantityChange(key, 'delete')} style={{ fontSize: "8px", color: "red", backgroundColor: "white" }}><DeleteFilled style={{ fontSize: "22px" }} /></Button>
                                    </Col>
                                </Row>
                            )
                        }
                        return null
                    })}
                </Col>
                <Col>
                    <h2>Payment</h2>
                    <h4>Sub-total</h4>
                    <h5>Rs/={subtotal}</h5>
                    <Checkout subtotal={subtotal} />
                </Col>
            </Row>

        </div>
    )
}
