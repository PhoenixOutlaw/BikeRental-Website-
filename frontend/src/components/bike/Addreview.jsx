import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addreview } from "../../redux/features/review/reviewAPI";
import { validjwt } from "../../utils/fnc";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import { message, Rate } from "antd";

const Addreview = ({ id, type, values, update }) => {
  const email = useSelector((state) => state.login.user.email);
  const dispatch = useDispatch();
  const defaultValue = {
    review: "",
    rating: 0,
  };
  const [review, setreview] = useState(defaultValue);
  function submit() {
    if (!(review.rating && review.review.length)) {
      message.error("review and rating cannot be empty");
      return null;
    }
    review.from = email;
    validjwt(() =>
      dispatch(
        addreview({
          id: id,
          data: review,
          success: () => setreview(defaultValue),
        })
      )
    );
    setreview(defaultValue);
  }

  return (
    <div
      className={
        "d-flex padding-lr-x padding-bottom-s padding-top-s gutter-s " +
        (!type ? "box-shadow" : "")
      }
    >
      {!type && (
        <div>
          <Avatar size={54} icon={<UserOutlined />} />
        </div>
      )}
      <div>
        <Rate
          allowHalf
          defaultValue={0}
          value={type ? values.rating : review.rating}
          onChange={(e) =>
            type
              ? update({ ...values, rating: e })
              : setreview({ ...review, rating: e })
          }
        />
        <textarea
          className="textarea input input--style1 margin-top-s p-m"
          placeholder="enter a review"
          rows="5"
          value={type ? values.review : review.review}
          onChange={(e) =>
            type
              ? update({ ...values, review: e.target.value })
              : setreview({ ...review, review: e.target.value })
          }
        />
        {!type && (
          <div className="d-flex gutter-s">
            <button
              className="btn btn-secondary margin-top-s"
              onClick={() => submit()}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary margin-top-s"
              onClick={() => setreview(defaultValue)}
            >
              reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addreview;
