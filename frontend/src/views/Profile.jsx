import { getuser, updateuser } from "../redux/features/admin/apis/userapi";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { updateuserinfo } from "../redux/features/login/loginSlice";
import { Avatar, Form, Input, message, Modal } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { trimspace, validjwt } from "../utils/fnc";
import { baseURL } from "../axios/axiosconfig";
import validator from "validator";
import ReservationCard from "../components/profile/ReservationCard";

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

const Profile = () => {
  const storedUser = useSelector((state) => state.login.user);
  const { id } = useParams();
  const [user, setUser] = useState(storedUser);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  function close() {
    form.resetFields();
    setUpdateVisible(false);
  }
  function updateuser_success() {
    validjwt(() =>
      dispatch(
        getuser({
          id: id ? id : user.id,
          success: (data) => {
            setUser(data);
            dispatch(updateuserinfo(data));
          },
        })
      )
    );
  }
  const updateform = (values) => {
    if (!validator.isEmail(values.email)) {
      message.error("Email invalid");
      return null;
    }
    const updatevalue = {
      id: user.id,
      updates: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        image: file,
      },
    };
    validjwt(() =>
      dispatch(
        updateuser({
          ...updatevalue,
          success: updateuser_success,
        })
      )
    );
    form.resetFields();
    setFile(null);
    setUpdateVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    validjwt(() =>
      dispatch(
        getuser({ id: id ? id : user.id, success: (data) => setUser(data) })
      )
    );
  }, [id, dispatch, user.id]);

  useEffect(() => {
    if (form.__INTERNAL__.name) form.setFieldsValue(user);
  }, [form, user]);

  return (
    <div className="d-flex justify-center gutter-m margin-top-s">
      <Modal
        title="update user"
        visible={updateVisible}
        onOk={() => form.submit()}
        onCancel={close}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{
            ...user,
          }}
          onFinish={updateform}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="profile image">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Item>
          {inputs.map((input, i) => (
            <Form.Item
              key={i}
              label={input.label}
              name={input.name}
              normalize={trimspace}
              rules={[
                {
                  validator: (_, value) =>
                    value.length
                      ? Promise.resolve()
                      : Promise.reject(message.error("No spaces allowed")),
                },
              ]}
            >
              <Input placeholder={user[Object.keys(user)[i + 1]]} />
            </Form.Item>
          ))}
        </Form>
      </Modal>
      <div className="profile d-flex--c align-center box-shadow padding-lr-m padding-bottom-m padding-top-m position-relative">
        <EditOutlined
          className="btn-edit btn ml-auto font-size-1 black"
          onClick={() => setUpdateVisible(true)}
        />
        <div className="d-flex">
          <Avatar
            size={120}
            shape="square"
            src={user?.image ? baseURL + "/" + user?.image : null}
            icon={<UserOutlined />}
          />
        </div>
        <div className="p p-s margin-top-s">
          {Object.keys(user).map((fields) =>
            !["reservations", "image"].includes(fields) ? (
              <p key={fields}>
                {fields}: {user[fields]}
              </p>
            ) : null
          )}
        </div>
      </div>

      <div className="profile d-flex--c align-center box-shadow padding-lr-m padding-bottom-m padding-top-m">
        <h3 className="heading heading-s m0">
          {id ? "users" : "your"} Reservations
        </h3>
        {user.reservations?.map((e) => (
          <ReservationCard
            key={e.id}
            id={id}
            data={e}
            user={user}
            setUser={setUser}
            storedUser={storedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
