import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { trimspace } from "../utils/fnc";
import validator from "validator";
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
    <div className="d-flex--c justify-center align-center h-screen">
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <h1 className="text-center">{register ? "Register" : "login"}</h1>
        {formFields.map((field) =>
          field.for.includes(register ? "register" : "signin") ? (
            <Form.Item
              key={field.fieldName}
              label={
                field.fieldName[0].toUpperCase() + field.fieldName.slice(1)
              }
              name={field.fieldName}
              normalize={trimspace}
              rules={field.rules}
            >
              {["password", "rePassword"].includes(field.fieldName) ? (
                <Input.Password />
              ) : (
                <Input />
              )}
            </Form.Item>
          ) : null
        )}
        <div className="d-flex gutter-m justify-center p">
          {!register && (
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          )}

          <Form.Item>
            <Typography>
              {register ? "already have an account" : "Dont have an account"}
              <Link to={register ? "/login" : "/register"}>
                {register ? " Login" : " Signup"}
              </Link>
            </Typography>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const formFields = [
  {
    fieldName: "firstName",
    for: ["register"],
    rules: [
      {
        required: true,
        message: "Please input your firstname!",
      },
    ],
  },
  {
    fieldName: " lastName",
    for: ["register"],
    rules: [
      {
        required: true,
        message: "Please input your lastname!",
      },
    ],
  },
  {
    fieldName: "email",
    for: ["register", "signin"],
    rules: [
      {
        required: true,
        message: "Enter a valid email address!",
      },
    ],
  },
  {
    fieldName: "password",
    for: ["register", "signin"],
    rules: [
      {
        required: true,
        message: "Password too weak use A-z,a-z,0-9,(#,$,* etc)",
      },
    ],
  },
  {
    fieldName: "rePassword",
    for: ["register"],
    rules: [
      {
        required: true,
        message: "Please input your confirmation password!",
      },
    ],
  },
];
