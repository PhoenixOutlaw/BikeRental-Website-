import { getuser, updateuser } from "../redux/features/admin/apis/userapi";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Form, Input, message, Modal, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { noupdates, trimspace, validjwt } from "../utils/fnc";
import validator from "validator";
import {
  deletereservation,
  updatereservation,
} from "../redux/features/reservation/reservationAPI";
import { updateuserinfo } from "../redux/features/login/loginSlice";

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
// const options = ["regular", "admin"];

const Profile = () => {
  const storeduser = useSelector((state) => state.login.user);
  const { id } = useParams();
  const [user, setuser] = useState(storeduser);
  const [updatevisible, setupdatevisible] = useState(false);
  const [form] = Form.useForm();
  const [file, setfile] = useState(null);
  const nav = useNavigate();
  function close() {
    form.resetFields();
    setupdatevisible(false);
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
        // role: values.role,
      },
    };
    validjwt(() =>
      dispatch(
        updateuser({
          ...updatevalue,
          success: () =>
            validjwt(() =>
              dispatch(
                getuser({
                  id: id ? id : user.id,
                  success: (data) => {
                    setuser(data);
                    dispatch(updateuserinfo(data));
                  },
                })
              )
            ),
        })
      )
    );
    form.resetFields();
    setfile(null)
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
  }, [id, dispatch, user.id]);

  useEffect(() => {
    if (form.__INTERNAL__.name) form.setFieldsValue(user);
  }, [form, user]);
 

  return (
    <div className="d-flex justify-center gutter-m margin-top-s">
      <Modal
        title="update user"
        visible={updatevisible}
        onOk={() => noupdates(user, form)}
        // onOk={() => form.submit()}
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
              onChange={(e) => setfile(e.target.files[0])}
            />
            {/* <Upload
              listType="picture"
              
              customRequest={({file,onSuccess})=>{
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}
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
          {/* <div className="d-flex justify-center full-width">
            <Form.Item label="roles" name="role" style={{ width: "10rem" }}>
              <Select placeholder={user?.role}>
                {options.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div> */}
        </Form>
      </Modal>
      <div className="profile d-flex--c align-center box-shadow padding-lr-m padding-bottom-m padding-top-m position-relative">
        <EditOutlined
          className="position-absolute btn-edit btn"
          style={{ fontSize: "1rem", top: "5%", right: "10%", color: "black" }}
          onClick={() => setupdatevisible(true)}
        />
        <div className="d-flex">
          <Avatar
            size={120}
            shape="square"
            src={user?.image ? `http://localhost:5000/${user?.image}` : null}
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
          <div
            className=" border d-flex gutter-s margin-bottom-s padding-bottom-s padding-top-s padding-lr-s"
            key={e.id}
          >
            <div>
              <p className="p p-s m0">name: {e.bike.name}</p>
              <p className="p p-s m0">model: {e.bike.model}</p>
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
                {e.active && storeduser.id === user.id && (
                  <button
                    className="btn btn-secondary margin-top-s "
                    onClick={() =>
                      validjwt(() =>
                        dispatch(
                          updatereservation({
                            id: e.id,
                            updates: { active: false },
                            success: () =>
                              validjwt(() =>
                                dispatch(
                                  getuser({
                                    id: id ? id : user.id,
                                    success: (data) => setuser(data),
                                  })
                                )
                              ),
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
            {storeduser.id === user.id && (
              <div>
                <DeleteOutlined
                  style={{ fontSize: "1rem" }}
                  className="btn btn-delete"
                  onClick={() =>
                    validjwt(() =>
                      dispatch(
                        deletereservation({
                          id: e.id,
                          success: () =>
                            validjwt(() =>
                              dispatch(
                                getuser({
                                  id: id ? id : user.id,
                                  success: (data) => setuser(data),
                                })
                              )
                            ),
                        })
                      )
                    )
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
