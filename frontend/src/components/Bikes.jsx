import { useNavigate, useSearchParams } from "react-router-dom";
import { getallbikes } from "../redux/features/bikes/bikeAPI";
import { Rate, Form, Input, Pagination, Button, message, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { noupdates, trimspace, validjwt } from "../utils/fnc";
import { DatePicker } from "antd";
import {
  addbike,
  deletebike,
  updatebike,
} from "../redux/features/admin/apis/bikeAPI";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { newfilter, resetfilter } from "../redux/features/bikes/bikeSlice";
import { addreservation } from "../redux/features/reservation/reservationAPI";
const { RangePicker } = DatePicker;

export const Bikes = () => {
  const availablebikes = useSelector((state) => state.bike.availablebikes);
  const unavailablebikes = useSelector((state) => state.bike.unavailablebikes);
  const role = useSelector((state) => state.login.user.role);
  const [visible, setvisible] = useState(false);
  const [limit, setlimit] = useState(10);
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const nav = useNavigate();
  const total = useSelector((state) => state.bike.total);
  const addform = (values) => {
    validjwt(() => dispatch(addbike(values)));
    form.resetFields();
    setvisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Failed:");
  };
  function submit() {
    form.getFieldValue().length === inputs.length
      ? form.submit()
      : message.error("all fields are required");
  }
  function close() {
    form.resetFields();
    setvisible(false);
  }

  return (
    <div className="position-relative padding-bottom-m">
      <Modal title="Add Bike" visible={visible} onOk={submit} onCancel={close}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
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
              normalize={trimspace}
            >
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>
      <div className="d-flex gutter-s">
        <div
          className=" padding-top-s padding-bottom-m padding-lr-m d-flex--c gutter-s box-shadow position-sticky"
          style={{ height: "fit-content", top: "0" }}
        >
          <Filter />
        </div>
        <div className="d-flex--c box-shadow fullwidth">
          <div className="d-flex align-center justify-center margin-bottom-s gutter-s">
            <div className="d-flex align-center gutter-s">
              <h1 className="text-center heading heading-m m0">Bikes</h1>
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
          </div>

          <div className="grid grid-auto-fit gutter-s justify-center">
            {availablebikes?.length > 0 &&
              availablebikes.map((bike) => (
                <Bike key={bike.id} available={true} bike={bike} />
              ))}
            {unavailablebikes?.length > 0 &&
              ["admin","manager"].includes(role) &&
              unavailablebikes.map((bike) => (
                <Bike key={bike.id} available={false} bike={bike} />
              ))}
          </div>
          {availablebikes ? (
            availablebikes?.length > 0 ? (
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
            ) : (
              <h4
                className=" heading text-center heading-s margin-bottom-m margin-top-s"
                style={{ border: "1px solid" }}
              >
                no available bikes
              </h4>
            )
          ) : (
            <>
              <h2 className="text-center p heading-m"> -_-</h2>
              <p className="text-center p p-m">
                select <span style={{ color: "red" }}>from-to</span> date to get
                any results
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Bike = ({ bike, available }) => {
  const { id, name, model, color, location, avgrating } = bike;
  const role = useSelector((state) => state.login.user.role);
  const [updatevisible, setupdatevisible] = useState(false);
  const [updform] = Form.useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const updateform = (values) => {
    const updates = {
      id: bike.id,
      updates: {
        name: values.name,
        model: values.model,
        color: values.color,
        location: values.location,
      },
    };
    validjwt(() => dispatch(updatebike(updates)));
    updform.resetFields();
    setupdatevisible(false);
  };
  function close() {
    updform.resetFields();
    setupdatevisible(false);
  }

  return (
    <div className="d-flex--c margin-bottom-s border padding-lr-s padding-bottom-s padding-top-s">
      <Modal
        title="update Bike"
        visible={updatevisible}
        onOk={() =>
          noupdates(
            {
              name: bike.name,
              color: bike.color,
              model: bike.model,
              location: bike.location,
            },
            updform
          )
        }
        onCancel={close}
      >
        <Form
          form={updform}
          name="basic"
          initialValues={{
            name: bike.name,
            color: bike.color,
            model: bike.model,
            location: bike.location,
          }}
          onFinish={updateform}
          onFinishFailed={() => message.error("failed to submit")}
          autoComplete="off"
        >
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
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Modal>
      <div className="d-flex justify-sb">
        <div>
          {!available ? (
            <p className="p p-s text dot dot--red">reserved</p>
          ) : (
            <p className="p p-s text d-flex align-center gutter-s dot dot--green">
              available
            </p>
          )}
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
                setupdatevisible(true);
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
      {available && (
        <button
          className="btn btn-secondary margin-top-s"
          onClick={() => validjwt(() => dispatch(addreservation({ id: id })))}
        >
          Add Reservations
        </button>
      )}
      <button
        className="btn btn-primary margin-top-s"
        onClick={() => nav(`/bike/${id}`)}
      >
        show more
      </button>
    </div>
  );
};

const Filter = () => {
  const sfilter = useSelector((state) => state.bike.filter);
  const dateFormat = "YYYY-MM-DD HH:mm";
  const [dates, setdates] = useState();
  const [query] = useSearchParams();
  const dispatch = useDispatch();
  const [form] = useForm();

  const onChange = (values, dates) => {
    setdates(dates);
  };

  const onFinish = (values) => {
    let { from_to, ...filter } = values;
    dispatch(
      newfilter({
        ...filter,
        from: moment(dates[0]).format(dateFormat),
        to: moment(dates[1]).format(dateFormat),
      })
    );
    validjwt(() =>
      dispatch(
        getallbikes({
          page: query.get("page") !== null ? query.get("page") : 1,
          limit: query.get("limit") !== null ? query.get("limit") : 10,
        })
      )
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          from_to: sfilter
            ? [moment(sfilter?.from), moment(sfilter?.to)]
            : null,
          name: sfilter?.name,
          location: sfilter?.location,
          model: sfilter?.model,
          color: sfilter?.color,
          rating: sfilter?.rating,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="From-To" name="from_to" rules={[{ required: true }]}>
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            allowClear={false}
            onChange={onChange}
            disabledDate={(current) => current.valueOf() < Date.now()}
            format={dateFormat}
          />
        </Form.Item>
        {inputs.map((input, i) => (
          <Form.Item
            key={i}
            label={input.label}
            name={input.name}
            normalize={trimspace}
          >
            <Input />
          </Form.Item>
        ))}
        <Form.Item label="Rating" name="rating">
          <Slider min={0} max={5} step={0.5} />
        </Form.Item>
        <div className=" d-flex gutter-s">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Filter
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="reset"
              onClick={() => {
                dispatch(resetfilter());
              }}
            >
              Reset
            </Button>
          </Form.Item>
        </div>
      </Form>
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
