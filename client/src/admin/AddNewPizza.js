import { Row, Col } from 'react-bootstrap'
import { AdminNavbar } from './AdminNavbar';
import { Button, Form, Input, InputNumber } from 'antd';
import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addPizzaAction } from '../actions/addPizzaAction';
import { useNavigate } from 'react-router-dom';

export const AddNewPizza = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = (values) => {
        const prices = [{ small: values.small, medium: values.medium, large: values.large }]
        const varients = ["small", "medium", "large"]
        values.prices = prices
        values.varients = varients
        axios.post("/api/pizzas/order/addnewpizza", { values })
            .then((resp) => {
                dispatch(addPizzaAction(values))
                navigate("/admin/pizzaslist")

            })
            .catch((err) => console.log(err))
    };
    const onFinishFailed = (errorInfo) => {
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
                            remember: true,
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
