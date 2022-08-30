import { Modal } from "antd";
import "react-calendar/dist/Calendar.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addreservation } from "../redux/features/reservation/reservationAPI";
import { DatePicker } from "antd";
import moment from "moment";
import {validjwt} from "../utils/fnc";

const { RangePicker } = DatePicker;

export const AddReservation = ({ id, visible, setvisible, closeform }) => {
  const dispatch = useDispatch();
  const [duration, setduration] = useState([]);

  const onChange = (value, dateString) => {
    setduration([
      moment(value[0]).format("YYYY-MM-DD HH:mm:ss"),
      moment(value[1]).format("YYYY-MM-DD HH:mm:ss"),
    ]);
  };
  function handleOk() {
    const reservation_duration = {
      from: duration[0],
      to: duration[1],
    };

    console.log(reservation_duration)
    validjwt(()=>dispatch(addreservation({ id: id, duration: reservation_duration })))
    setvisible(false);
  }

  function close() {
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
        {/* <Calendar onChange={onChange} value={value} minDate={new Date()} />
         */}
        <RangePicker
          showTime={{
            format: "HH:mm",
          }}
          disabledDate={(current) => current.valueOf() < Date.now()}
          format="YYYY-MM-DD HH:mm"
          onChange={onChange}
        />
      </div>
    </Modal>
  );
};
