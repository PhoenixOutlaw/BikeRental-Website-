import { Button, Checkbox, Form, Input, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const Signin = ({ register }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="d-flex justify-center margin-top-x">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 className="text-center">{register ? "Register" : "login"}</h1>
        {register && (
          <>
            <Form.Item
              label="FirstName"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your firstname!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="LastName"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your lastname!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {register && (
          <Form.Item
            label="RePassword"
            name="repassword"
            rules={[
              {
                required: true,
                message: "Please input your confirmation password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
        {
          <div className="d-flex">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Typography >
                {register?"already have an account":"Dont have an account"}
                <Link to={register?"/login":"/register"}>{register ? " Login" : " Signup"}</Link>
              </Typography>
            </Form.Item>
          </div>
        }
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
