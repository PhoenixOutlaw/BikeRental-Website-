import { useNavigate, useSearchParams } from "react-router-dom";
import { addbike } from "../redux/features/admin/apis/bikeAPI";
import { Form, Input, Pagination, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PlusSquareOutlined } from "@ant-design/icons";
import { trimspace, validjwt } from "../utils/fnc";
import { INPUTS } from "../components/bikes/constants";
import Modal from "antd/lib/modal/Modal";
import BikeCard from "../components/bikes/BikeCard";
import { useState } from "react";
import Filter from "../components/bikes/Filter";

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
    Object.keys(form.getFieldValue()).length === INPUTS.length
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
          {INPUTS.map((input, i) => (
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
        <div className=" padding-top-s padding-bottom-m padding-lr-m d-flex--c gutter-s box-shadow position-sticky height-fit top-0">
          <Filter />
        </div>
        <div className="d-flex--c box-shadow fullwidth">
          <div className="d-flex align-center justify-center margin-bottom-s gutter-s">
            <div className="d-flex align-center gutter-s">
              <h1 className="text-center heading heading-m m0">Bikes</h1>
              {role === "admin" && (
                <div
                  className="btn p-m font-size-2"
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
                <BikeCard key={bike.id} available={true} bike={bike} />
              ))}
            {unavailablebikes?.length > 0 &&
              ["admin", "manager"].includes(role) &&
              unavailablebikes.map((bike) => (
                <BikeCard key={bike.id} available={false} bike={bike} />
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
              <h4 className=" heading text-center heading-s margin-bottom-m margin-top-s border border-1">
                no available bikes
              </h4>
            )
          ) : (
            <>
              <h2 className="text-center p heading-m"> -_-</h2>
              <p className="text-center p p-m">
                select <span className="red">from-to</span> date to get any
                results
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
