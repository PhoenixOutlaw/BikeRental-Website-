import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import validator from "validator";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register as registerapi,
} from "../redux/features/login/loginAPI";

export const Signin = ({ register }) => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const onFinish = (values) => {
    if (!register) {
      dispatch(login({ data: values, success: () => nav("/") }));
      return null;
    }
    if (values.password !== values.repassword) {
      message.error("Password does not match");
      return null;
    }
    if (!validator.isEmail(values.email)) {
      message.error("Email invalid");
      return null;
    }
    if (
      !validator.isStrongPassword(values.password, {
        minLength: 5,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      message.error(
        "Password too weak must have a-z, A-Z, 0-9, (1 special character)"
      );
      return null;
    }
    dispatch(registerapi({ data: values, success: () => nav("/") }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <Row style={{ height: "100vh", alignContent: "center" }} justify="center">
      <Form
        name="basic"
        style={{ height: "fit-content", width: "70%" }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Row span={18} justify="center">
          <h1 className="text-center">{register ? "Register" : "login"}</h1>
        </Row>
        {register && (
          <>
            <Row span={18} justify="center">
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
            </Row>
            <Row span={18} justify="center">
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
            </Row>
          </>
        )}
        <Row span={18} justify="center">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Enter a valid email address!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Row>
        <Row span={18} justify="center">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password too weak use A-z,a-z,0-9,(#,$,* etc)",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Row>

        {register && (
          <Row span={18} justify="center">
            <Form.Item
              label="Confirm"
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
          </Row>
        )}
        {
          <Row span={24} gutter={4} justify="center">
            <Col span={8}>
              {!register && (
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
              )}
            </Col>

            <Col span={12}>
              <Form.Item
                wrapperCol={{
                  span: 16,
                }}
              >
                <Typography>
                  {register
                    ? "already have an account"
                    : "Dont have an account"}
                  <Link to={register ? "/login" : "/register"}>
                    {register ? " Login" : " Signup"}
                  </Link>
                </Typography>
              </Form.Item>
            </Col>
          </Row>
        }
        <Row span={18} justify="center">
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  );
};
