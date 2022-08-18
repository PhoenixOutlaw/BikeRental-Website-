import { Modal } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addreservation } from "../redux/features/reservation/reservationAPI";

export const AddReservation = ({ id, visible, setvisible, closeform }) => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch();

  function handleOk() {
    const duration = value.getTime() / 1000;
    dispatch(addreservation({ id: id, duration: duration }));
    onChange(new Date());
    setvisible(false);
  }
  function close() {
    onChange(new Date());
    setvisible(false);
  }
  return (
    <Modal
      title="Add Reservation"
      visible={visible}
      onOk={handleOk}
      onCancel={close}
    >
      <div className="d-flex justify-center">
        <Calendar onChange={onChange} value={value} minDate={new Date()} />
      </div>
    </Modal>
  );
};
