import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Form, Input, Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletereservation,
  updatereservation,
} from "../redux/features/reservation/reservationAPI";
import { validjwt } from "../utils/fnc";
import { getuser, updateuser } from "../redux/features/admin/apis/userapi";

const inputs = [
  {
    label: "FirstName",
    name: "firstName",
  },
  {
    label: "LastName",
    name: "lastName",
  },
];
const options = ["regular", "admin"];

const Profile = () => {
  const storeduser = useSelector((state) => state.login.user);
  const { id } = useParams();
  const [user, setuser] = useState(storeduser);
  const [updatevisible, setupdatevisible] = useState(false);
  const [form] = Form.useForm();
  const nav = useNavigate();
  function close() {
    form.resetFields();
    setupdatevisible(false);
  }
  const updateform = (values) => {
    const updatevalue = {
      id: user.id,
      updates: {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
      },
    };
    validjwt(() => dispatch(updateuser(updatevalue)));
    form.resetFields();
    setupdatevisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    validjwt(() =>
      dispatch(
        getuser({ id: id ? id : user.id, success: (data) => setuser(data) })
      )
    );
  }, []);

  return (
    <div className="d-flex justify-center gutter-m margin-top-s">
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
          initialValues={{
            ...user,
          }}
          onFinish={updateform}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {inputs.map((input, i) => (
            <Form.Item key={i} label={input.label} name={input.name}>
              <Input placeholder={user[Object.keys(user)[i + 1]]} />
            </Form.Item>
          ))}
          <div className="d-flex justify-center full-width">
            <Form.Item label="roles" name="role" style={{ width: "10rem" }}>
              <Select placeholder={user?.role}>
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
      <div className="profile d-flex--c align-center box-shadow padding-lr-m padding-bottom-m padding-top-m position-relative">
        <EditOutlined
          className="position-absolute btn-edit btn"
          style={{ fontSize: "1rem", top: "5%", right: "10%" }}
          onClick={() => setupdatevisible(true)}
        />
        <div className="d-flex">
          <Avatar size={120} shape="square" icon={<UserOutlined />} />
        </div>
        <div className="p p-s margin-top-s">
          {Object.keys(user).map((fields) =>
            fields !== "reservations" ? (
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
          <div
            className=" border d-flex gutter-s margin-bottom-s padding-bottom-s padding-top-s padding-lr-s"
            key={e.id}
          >
            <div>
              <p className="p p-s m0">name: {e.bike.name}</p>
              {e.active ? (
                <p className="p p-s text dot dot--green">active</p>
              ) : (
                <p className="p p-s text dot dot--red">canceled</p>
              )}
              <p className="p p-s m0" style={{ color: "red" }}>
                from: {e.from}
              </p>
              <p className="p p-s m0" style={{ color: "red" }}>
                to: {e.to}
              </p>
              <div className="d-flex gutter-s">
                {e.active && (
                  <button
                    className="btn btn-secondary margin-top-s "
                    onClick={() =>
                      validjwt(() =>
                        dispatch(
                          updatereservation({
                            id: e.id,
                            updates: { active: false },
                          })
                        )
                      )
                    }
                  >
                    cancel
                  </button>
                )}
                <button
                  className="btn btn-secondary margin-top-s"
                  onClick={() => nav(`/bike/${e.bike.id}`)}
                >
                  show more
                </button>
              </div>
            </div>
            <div>
              <DeleteOutlined
                style={{ fontSize: "1rem" }}
                className="btn btn-delete"
                onClick={() =>
                  e.id &&
                  validjwt(() =>
                    dispatch(deletereservation({ id: e.id, type: "user" }))
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
