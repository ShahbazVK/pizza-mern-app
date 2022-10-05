import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userAction } from './actions/userAction';
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const onFinish = (values) => {
        axios.post("/api/pizzas/user/register", { values })
            .then((resp) => {
                if (resp.data.err) toast.error('User already registered by this email...')
                else {
                    toast.success('Registered')
                    dispatch(userAction(values))
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                }

            })
            .catch((err) => console.log(err))
    };

    const onFinishFailed = (errorInfo) => {
    };

    return (
        <Form style={{ marginTop: "30px" }}
            name="basic"
            labelCol={{
                span: 10,
            }}
            wrapperCol={{
                span: 6,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmpassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 11,
                    span: 160,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 11,
                    span: 160,
                }}
            >
                {/* <Link to='/login'><Button className='registersubmitbutton' type="primary" htmlType="submit">
                    Register
                </Button></Link> */}
                <Button className='registersubmitbutton' type="primary" htmlType="submit">
                    Register
                </Button>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Form.Item>
        </Form>
    );
};
