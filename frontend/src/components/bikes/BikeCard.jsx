import { addreservation } from "../../redux/features/reservation/reservationAPI";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { trimspace, validjwt, noupdates } from "../../utils/fnc";
import { useNavigate } from "react-router-dom";
import { INPUTS } from "./constants";
import { Form, Input, message, Modal, Rate } from "antd";
import { useState } from "react";
import {
  deletebike,
  updatebike,
} from "../../redux/features/admin/apis/bikeAPI";

const BikeCard = ({ bike, available }) => {
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
          {INPUTS.map((input, i) => (
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

export default BikeCard;
