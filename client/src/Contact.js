import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { AiOutlineMail } from 'react-icons/ai'
import { FiPhoneCall } from 'react-icons/fi'


export const Contact = () => {
    return (
        <div>
            <h1>Contact us</h1>
            <Row>
                <Col md={6}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique numquam fuga dolor dignissimos eaque voluptatibus excepturi deleniti itaque neque suscipit, fugit laborum facere, sint in pariatur porro amet recusandae, doloremque esse. Quis itaque in reprehenderit ullam facere sapiente id a aliquam natus, fugiat similique ratione quidem perferendis placeat! Mollitia recusandae deserunt totam illo culpa aspernatur. Impedit, incidunt. Inventore, iusto repellendus! Voluptatibus animi dicta consequuntur libero voluptatem dolorum tempora suscipit earum provident possimus pariatur perspiciatis, expedita ad itaque in exercitationem aliquid, ipsa quod inventore ipsam dolor? Tenetur necessitatibus natus quod cum officia exercitationem at non repellat tempora qui! Sapiente, odit repellendus?</p>
                    <Table style={{ textAlign: "center" }} striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th colSpan={4}>Contact us</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ color: "blue", fontSize: "20px" }}><FiPhoneCall /></td>
                                <td>Mark</td>
                                <td>032434582844</td>
                            </tr>
                            <tr>
                                <td style={{ color: "blue", fontSize: "20px" }}><AiOutlineMail /></td>
                                <td>Jacob</td>
                                <td>shahbazalivk@gmail.com</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <Image style={{ height: "100%", width: "100%" }} src='images/farmhouse.jpg' />
                </Col>
            </Row>
        </div>
    )
}
