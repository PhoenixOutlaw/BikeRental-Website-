import { Form, Input, message, Modal, Pagination, Select } from "antd";
import { setcurrentuser } from "../redux/features/admin/adminSlice";
import { registeruser } from "../redux/features/login/loginAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { validjwt } from "../utils/fnc";
import validator from "validator";
import {
  deleteuser,
  getalluser,
  updateuser,
} from "../redux/features/admin/apis/userapi";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

const inputs = [
  {
    label: "FirstName",
    name: "firstName",
  },
  {
    label: "LastName",
    name: "lastName",
  },
  {
    label: "Email",
    name: "email",
  },
];

const inputcreate = [
  ...inputs,

  {
    label: "Password",
    name: "password",
  },
  {
    label: "Confirm-Password",
    name: "repassword",
  },
];
const options = ["regular", "admin"];

const Dashboard = () => {
  const role = useSelector((state) => state.login.user.role);
  const status = useSelector((state) => state.admin.status);
  const [updatevisible, setupdatevisible] = useState(false);
  const userid = useSelector((state) => state.login.user.id);
  const users = useSelector((state) => state.admin.users);
  const currentuser = useSelector((state) => state.admin.currentuser);
  const total = useSelector((state) => state.admin.total);
  const [visible, setvisible] = useState(false);
  const [filter, setfilter] = useState("");
  const [limit, setlimit] = useState(10);
  const [createform] = Form.useForm();
  const [form] = Form.useForm();
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const { Search } = Input;

  const createuser = (values) => {
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
    createform.resetFields();
    dispatch(registeruser({ data: values }));
  };

  const updateform = (values) => {
    if (!validator.isEmail(values.email)) {
      message.error("Email invalid");
      return null;
    }
    const updatevalue = {
      id: currentuser.id,
      updates: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        role: values.role,
      },
    };
    validjwt(() => dispatch(updateuser(updatevalue)));
    form.resetFields();
    dispatch(setcurrentuser(undefined));
    setupdatevisible(false);
  };

  function close() {
    form.resetFields();
    dispatch(setcurrentuser(undefined));
    setupdatevisible(false);
  }

  const nav = useNavigate();
  useEffect(() => {
    validjwt(() =>
      dispatch(
        getalluser({
          search: filter,
          page: query.get("page"),
          limit: query.get("limit"),
        })
      )
    );
  }, [filter]);

  useEffect(() => {
    form.setFieldsValue(currentuser);
  }, [form, currentuser]);

  return (
    <div className="">
      {role === "admin" && currentuser && (
        <Modal
          title="update user"
          visible={updatevisible}
          onOk={form.submit}
          onCancel={close}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={updateform}
            autoComplete="off"
          >
            {inputs.map((input, i) => (
              <Form.Item key={i} label={input.label} name={input.name}>
                <Input />
              </Form.Item>
            ))}

            <div className="d-flex justify-center full-width">
              <Form.Item label="roles" name="role" style={{ width: "10rem" }}>
                <Select placeholder={currentuser?.role}>
                  {options.map((i) => (
                    <Select.Option key={i} value={i}>
                      {i}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      )}

      <Modal
        title="create user"
        visible={visible}
        onOk={() => {
          createform.submit();
          setvisible(false);
        }}
        onCancel={() => {
          setvisible(false);
          createform.resetFields();
        }}
      >
        <Form
          form={createform}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{}}
          onFinish={createuser}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {inputcreate.map((input, i) => (
            <Form.Item
              key={i}
              label={input.label}
              name={input.name}
              rules={[
                {
                  required: true,
                  message: `Please input your ${input.name}!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ))}
          <div className="d-flex justify-center full-width">
            <Form.Item
              label="roles"
              name="role"
              style={{ width: "10rem" }}
              rules={[
                {
                  required: true,
                  message: `Please input role!`,
                },
              ]}
            >
              <Select>
                {options.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <div className="d-flex align-center justify-center gutter-s padding-bottom-s ">
        <h1 className="m0 heading heading-m text-center">Users</h1>
        {role === "admin" && (
          <div
            className="btn p-m"
            style={{ fontSize: "2rem" }}
            onClick={() => setvisible(true)}
          >
            <PlusSquareOutlined />
          </div>
        )}
      </div>

      <div className="padding-bottom-m  d-flex gutter-s">
        <Search
          placeholder="search user"
          loading={status !== "idle"}
          enterButton
          allowClear
          onSearch={(e) => setfilter(e)}
        />
      </div>

      {users?.length > 0 ? (
        users?.map((user) =>
          user.id === userid ? null : (
            <div
              key={user.id}
              className="d-flex box-shadow p p-s padding-lr-m padding-top-s padding-bottom-s justify-sb margin-bottom-s"
            >
              <div>
                <p className="m0">Id : {user.id}</p>
                <p className="m0">
                  Name : {user.firstName} {user.lastName}
                </p>
                <p className="m0">Email : {user.email}</p>
                <p className="m0">Role : {user.role}</p>
              </div>
              <div className="admin d-flex--c gutter-s padding-lr-s justify-right">
                <EditOutlined
                  className="btn btn-edit p-m"
                  onClick={() => {
                    dispatch(setcurrentuser(user));
                    setupdatevisible(true);
                  }}
                />
                <DeleteOutlined
                  className="btn btn-delete p-m"
                  onClick={() => {
                    validjwt(() => dispatch(deleteuser(user.id)));
                  }}
                />
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    nav(`/user/${user.id}`);
                  }}
                >
                  More details
                </button>
              </div>
            </div>
          )
        )
      ) : (
        <h2 className="text-center p p-m"> no results found</h2>
      )}

      {users?.length > 0 && (
        <div className="d-flex justify-center padding-bottom-x padding-top-m">
          <Pagination
            total={total}
            showSizeChanger={true}
            onShowSizeChange={(e) => setlimit(e)}
            responsive={true}
            Current={query.get("page") ? query.get("page") : 1}
            onChange={(page) => nav(`/dashboard?page=${page}&limit=${limit}`)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
