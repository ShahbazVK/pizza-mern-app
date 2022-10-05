import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import { AdminNavbar } from './AdminNavbar';
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import { getAllOrdersAction } from '../actions/getAllOrdersAction'
import axios from 'axios';


export const OrderList = () => {
    const dispatch = useDispatch()
    // const pizzastate = useSelector(state => state.getAllPizzaReducer)
    // const { loading, pizzas, error } = pizzastate
    const allOrders = useSelector((state) => state.getAllOrdersReducer.data)
    useEffect(() => {
        // dispatch(getAllPizzas())//problem here
        axios.get("/api/pizzas/order/getallorders")
            .then((resp) => {
                dispatch(getAllOrdersAction(resp.data))
            })
            .catch((err) => console.log(err))
    }, [dispatch])
    const deliveredFunc = (id) => {
        axios.post("/api/pizzas/order/nowdelivered", { id })
            .then((resp) => {
                window.location.href = "/admin/orderlist"
            })
            .catch((err) => console.log(err))
    }
    return (
        <div style={{ textAlign: "center" }}>
            <br /><br /><br />
            <Row className='adminbuttons'>
                <h1 className='adminheading'>ADMIN PANEL</h1>
                <Col md={2}>
                    <AdminNavbar />
                </Col>
                <Col md={10}>
                    <Table striped bordered hover style={{ fontSize: "16px" }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Order Id</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.map((element, key) => {
                                return (
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{element._id}</td>
                                        <td>{element.email}</td>
                                        <td>RS/={element.orderAmount}</td>
                                        <td>{element.createdAt.slice(0, 10)}</td>
                                        <td>{element.isDelivered ? "Delivered" : <Button onClick={() => deliveredFunc(element._id)} >Deliver</Button>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />

        </div>
    );
};