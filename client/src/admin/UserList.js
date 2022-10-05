import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import { AdminNavbar } from './AdminNavbar';
import { useDispatch, useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table';
import { getAllUsersAction } from '../actions/getAllUsersAction'
import axios from 'axios';


export const UserList = () => {
    const dispatch = useDispatch()
    // const pizzastate = useSelector(state => state.getAllPizzaReducer)
    // const { loading, pizzas, error } = pizzastate
    const allUsers = useSelector((state) => state.getAllUsersReducer.data)
    useEffect(() => {
        // dispatch(getAllPizzas())//problem here
        axios.get("/api/pizzas/order/getallusers")
            .then((resp) => {
                dispatch(getAllUsersAction(resp.data))
            })
            .catch((err) => console.log(err))
    }, [dispatch])
    const adminFunc = (id, operation) => {
        axios.post("/api/pizzas/order/admintoggle", { id, operation })
            .then((resp) => {
                window.location.href = "/admin/userlist"
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
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((element, key) => {
                                return (
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{element._id}</td>
                                        <td>{element.username}</td>
                                        <td>{element.email}</td>
                                        <td>{element.isAdmin ? <Button variant='danger' onClick={() => adminFunc(element._id, 'remove')} >Remove Admin</Button> : <Button onClick={() => adminFunc(element._id, 'make')} >Make Admin</Button>}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br />
        </div>
    );
};