import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { getOrderAction } from './actions/orderAction'
import { Row, Col } from 'react-bootstrap'

export const Orders = () => {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.loginReducer.user.email)
    const allOrders = useSelector((state) => state.getOrderReducer.data)
    useEffect(() => {
        axios.get(`/api/pizzas/order/getorders/${email}`)
            .then((resp) => {
                dispatch((getOrderAction(resp.data)))
            })
            .catch((err) => console.log(err))
    }, [email, dispatch])

    return (
        <div style={{ textAlign: "center", marginTop: "24px" }}>
            <h1>Your Orders</h1>
            <hr />
            {allOrders.length > 0 ?
                <div className='ordersBackground' style={{ borderRadius: "10px" }}>
                    <Row>
                        <Col>
                            <h2>ITEMS</h2>
                        </Col>
                        <Col>
                            <h2>ADDRESS</h2>
                        </Col>
                        <Col>
                            <h2>ORDER INFO</h2>
                        </Col>
                    </Row>
                    <>
                        {
                            allOrders.map((element, key) => {
                                return (
                                    <Row style={{ borderBottom: "2px solid black" }}>
                                        <Col style={{ borderRight: "2px solid black" }}>
                                            {element.orderItems.map((element1, key1) => {
                                                return (
                                                    <div>
                                                        <Col>
                                                            <h5>{element1.name}[{element1.variant}] * {element1.quantity} = {element1.quantity * element1.price}</h5>
                                                        </Col>
                                                    </div>
                                                )

                                            })}
                                        </Col>
                                        <Col style={{ borderRight: "2px solid black" }}>
                                            <h5>Street: {element.shippingAddress.street}</h5>
                                            <h5>City: {element.shippingAddress.city}</h5>
                                            <h5>Pincode: {element.shippingAddress.pincode}</h5>
                                            <h5>Country: {element.shippingAddress.country}</h5>
                                        </Col>
                                        <Col>
                                            <h5>Order Amount: Rs/={element.orderAmount}</h5>
                                            <h5>Transaction ID: {element.transactionId}</h5>
                                            <h5>Order ID: {element._id}</h5>
                                        </Col>

                                    </Row>

                                )
                            })
                        }
                    </>
                </div> : <h4>No orders to show</h4>}
            <br />
            <br />
            <br />

        </div>
    )
}
