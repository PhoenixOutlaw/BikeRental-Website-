import { Form, Input, Button, Slider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { DatePicker } from "antd";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { newfilter, resetfilter } from "../../redux/features/bikes/bikeSlice";
import { trimspace, validjwt } from "../../utils/fnc";
import { getallbikes } from "../../redux/features/bikes/bikeAPI";
import { INPUTS } from "./constants";
const { RangePicker } = DatePicker;

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
        {INPUTS.map((input, i) => (
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

export default Filter;
