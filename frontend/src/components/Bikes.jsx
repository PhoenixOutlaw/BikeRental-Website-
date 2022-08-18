import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  addbike,
  deletebike,
  updatebike,
} from "../redux/features/admin/apis/bikeAPI";
import { Rate, Form, Input, Pagination, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallbikes } from "../redux/features/bikes/bikeAPI";
import { validjwt } from "../utils/fnc";
import "antd/dist/antd.css";
const { Search } = Input;

export const Bikes = () => {
  const bikes = useSelector((state) => state.bike.bikes);
  const status = useSelector((state) => state.bike.status);
  const [biketoupdate, setbiketoupdate] = useState(undefined);
  const [updatevisible, setupdatevisible] = useState(false);
  const [visible, setvisible] = useState(false);
  const [limit, setlimit] = useState(10);
  const [query] = useSearchParams();
  const [updform] = Form.useForm();
  const [filter, setfilter] = useState({ search: "", rating: 0 });
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const nav = useNavigate();

  const options = [0];
  for (let i = 1; i <= 5; i += 0.5) {
    options.push(i);
  }
  const total = useSelector((state) => state.bike.total);
  const addform = (values) => {
    validjwt(() => dispatch(addbike(values)));
    form.resetFields();
    setvisible(false);
  };

  const updateform = (values) => {
    const updates = {
      id: biketoupdate.id,
      updates: {
        name: values.name ? values.name : biketoupdate.name,
        model: values.model ? values.model : biketoupdate.model,
        color: values.color ? values.color : biketoupdate.color,
        location: values.location ? values.location : biketoupdate.location,
      },
    };
    validjwt(() => dispatch(updatebike(updates)));
    updform.resetFields();
    setupdatevisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  function close() {
    visible ? form.resetFields() : updform.resetFields();
    setupdatevisible(false);
    setvisible(false);
  }

  useEffect(() => {
    validjwt(() =>
      dispatch(
        getallbikes({
          page: query.get("page"),
          limit: query.get("limit"),
          ...filter,
        })
      )
    );
  }, [query, dispatch, filter]);
  return (
    <div className="position-relative">
      <Modal
        title="Add Bike"
        visible={visible}
        onOk={form.submit}
        onCancel={close}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={addform}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {inputs.map((input, i) => (
            <Form.Item
              key={i}
              label={input.label}
              name={input.name}
              rules={input.rules}
            >
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>

      {biketoupdate && (
        <Modal
          title="update Bike"
          visible={updatevisible}
          onOk={updform.submit}
          onCancel={close}
        >
          <Form
            form={updform}
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={updateform}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {inputs.map((input, i) => (
              <Form.Item key={i} label={input.label} name={input.name}>
                <Input
                  placeholder={biketoupdate[Object.keys(biketoupdate)[i + 1]]}
                />
              </Form.Item>
            ))}
          </Form>
        </Modal>
      )}

      <div className="d-flex align-center justify-center margin-bottom-s gutter-s">
        <RollbackOutlined
         className="btn position-absolute "
         style={{left: '0',fontSize: '2rem',paddingLeft:'2rem'}}
          onClick={() => {nav(`/?page=1&limit=${limit}`);setfilter({search:"",rating: 0});}}
        />
        <div className="d-flex align-center gutter-s">
          <h1 className="text-center heading heading-m m0">Bikes</h1>
          <div
            className="btn p-m"
            style={{ fontSize: "2rem" }}
            onClick={() => setvisible(true)}
          >
            <PlusSquareOutlined />
          </div>
        </div>
      </div>

      <div className="padding-bottom-m padding-lr-m d-flex gutter-s">
        <Search
          placeholder="input search loading default"
          loading={status !== "idle"}
          enterButton
          onSearch={(e) => setfilter({ ...filter, search: e })}
        />
        <Select
          defaultValue={0}
          value={filter.rating}
          onChange={(e) => setfilter({ ...filter, rating: e })}
        >
          {options.map((i) => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div className="grid grid-auto-fit gutter-s justify-center">
        {bikes.length &&
          bikes.map((bike) => (
            <Bike
              key={bike.id}
              bike={bike}
              edit={setupdatevisible}
              setbiketoupdate={setbiketoupdate}
            />
          ))}
      </div>

      <div className="d-flex justify-center padding-bottom-x padding-top-m">
        <Pagination
          total={total}
          showSizeChanger={true}
          onShowSizeChange={(e) => setlimit(e)}
          responsive={true}
          Current={query.get("page") ? query.get("page") : 1}
          onChange={(page) => nav(`/?page=${page}&limit=${limit}`)}
        />
      </div>
    </div>
  );
};

const Bike = ({ bike, edit, setbiketoupdate }) => {
  const { id, name, model, color, location, avgrating } = bike;
  const role = useSelector((state) => state.login.user.role);
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <div className="d-flex--c margin-bottom-s border padding-lr-s padding-bottom-s padding-top-s">
      <div className="d-flex justify-sb">
        <div>
          <p className="p p-s text">name : {name}</p>
          <p className="p p-s text">model : {model}</p>
          <p className="p p-s text">color : {color}</p>
          <p className="p p-s text">location : {location}</p>
        </div>
        {role === "admin" && (
          <div className="admin d-flex--c gutter-s padding-lr-s">
            <EditOutlined
              className="btn btn-edit p-m"
              onClick={() => {
                edit(true);
                setbiketoupdate(bike);
              }}
            />
            <DeleteOutlined
              className="btn btn-delete p-m"
              onClick={() => {
                validjwt(() => dispatch(deletebike(id)));
              }}
            />
          </div>
        )}
      </div>
      <Rate allowHalf defaultValue={avgrating} count={5} disabled={true} />
      <button
        className="btn btn-primary margin-top-s"
        onClick={() => nav(`/bike/${id}`)}
      >
        show more
      </button>
    </div>
  );
};

const inputs = [
  {
    label: "Name",
    name: "name",
    rules: [
      {
        required: true,
        message: "Please input your Bikes Name!",
      },
    ],
  },
  {
    label: "Model",
    name: "model",
    rules: [
      {
        required: true,
        message: "Please input your Bikes Model!",
      },
    ],
  },
  {
    label: "Color",
    name: "color",
    rules: [
      {
        required: true,
        message: "Please input your Bikes color!",
      },
    ],
  },
  {
    label: "Location",
    name: "location",
    rules: [
      {
        required: true,
        message: "Please input your Bikes Location!",
      },
    ],
  },
];
