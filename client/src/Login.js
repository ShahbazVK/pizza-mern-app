import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from './actions/loginAction';
import { toast, Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const currentuser = useSelector((state) => state.loginReducer.user.username)

    useEffect(() => {
        if (currentuser !== "") navigate("/")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onFinish = (values) => {
        axios.post("/api/pizzas/user/login", { values })
            .then((resp) => {
                if (resp.data.err) toast.error(resp.data.err)
                else {
                    localStorage.setItem("currentuser", JSON.stringify({ isAdmin: resp.data.isAdmin, email: resp.data.email, username: resp.data.username }))
                    toast.success('Logging in')
                    dispatch(loginAction({ isAdmin: resp.data.isAdmin, email: resp.data.email, username: resp.data.username }))
                    setTimeout(() => {
                        navigate("/");
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
                <Button className='registersubmitbutton' type="primary" htmlType="submit">
                    Log in
                </Button>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </Form.Item>
        </Form>
    );
};
