import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap'
import { AdminNavbar } from './AdminNavbar';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPizzas } from '../actions/pizzaAction'
import Table from 'react-bootstrap/Table';
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom';


export const PizzasList = () => {
    const dispatch = useDispatch()
    const pizzastate = useSelector(state => state.getAllPizzaReducer)
    const { pizzas } = pizzastate
    useEffect(() => {
        dispatch(getAllPizzas())//problem here
    }, [dispatch])
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
                                <th>Pizza Name</th>
                                <th>Prices</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizzas.map((element, key) => {
                                return (
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td style={{ fontWeight: "bold", fontSize: "25px" }}>{element.name}<br /><Image width={"300rem"} height={"200rem"} src={element.image} /></td>
                                        <td>
                                            <td>small: {element.prices[0].small}</td><br />
                                            <td>medium: {element.prices[0].medium}</td><br />
                                            <td>large: {element.prices[0].large}</td>
                                        </td>
                                        <td>{element.category}</td>
                                        <td className='editupdatebuttonrow'><Link state={{ id: element._id }} to={'/admin/editpizza'}><AiFillEdit /></Link><Link state={{ id: element._id }} to={'/admin/deletepizza'}><AiTwotoneDelete /></Link></td>
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