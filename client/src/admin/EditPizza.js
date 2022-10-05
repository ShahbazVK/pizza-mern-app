import { Row, Col } from 'react-bootstrap'
import { AdminNavbar } from './AdminNavbar';
import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const EditPizza = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = location.state
    const pizzatoBeUpdated = useSelector((state) => state.getAllPizzaReducer.pizzas.find((element) => element._id === id))
    const onFinish = (values) => {
        const prices = [{ small: values.small, medium: values.medium, large: values.large }]
        const variants = ["small", "medium", "large"]
        values.prices = prices
        values.variants = variants
        values._id = pizzatoBeUpdated._id
        axios.post("/api/pizzas/order/editpizza", { values })
            .then((resp) => {
                // dispatch(getAllPizzas())
                navigate("/admin/pizzaslist")
            })
            .catch((err) => console.log(err))
    };
    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <br /><br /><br />

            <Row className='adminbuttons'>
                <h1 className='adminheading'>ADMIN PANEL</h1>
                {/* <br /><br /><br /> */}
                <Col md={2}>
                    <AdminNavbar />
                </Col>
                <Col>
                    <Form
                        className='addnewpizzaform'
                        name="basic"
                        initialValues={{
                            name: pizzatoBeUpdated.name,
                            image: pizzatoBeUpdated.image,
                            description: pizzatoBeUpdated.description,
                            category: pizzatoBeUpdated.category,
                            small: pizzatoBeUpdated.prices[0].small,
                            medium: pizzatoBeUpdated.prices[0].medium,
                            large: pizzatoBeUpdated.prices[0].large
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <br />
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input name of pizza!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Row>
                            <Col>
                                <br />
                                <Form.Item
                                    label="Small price"
                                    name="small"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input price!',
                                        },
                                    ]}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                            <Col>
                                <br />
                                <Form.Item
                                    label="Medium price"
                                    name="medium"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input price!',
                                        },
                                    ]}
                                >
                                    <InputNumber />

                                </Form.Item>
                            </Col>
                            <Col>

                                <br />
                                <Form.Item
                                    label="Large price"
                                    name="large"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input price!',
                                        },
                                    ]}
                                >
                                    <InputNumber />

                                </Form.Item>
                            </Col>
                        </Row>
                        <br />
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input image source!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <br />
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input description!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <br />
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input category!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                span: 12,
                                offset: 6,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <br />
            <br />
            <br />
        </div>
    );
};