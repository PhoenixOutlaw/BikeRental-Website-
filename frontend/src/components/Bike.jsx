import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getbike } from "../redux/features/bikes/bikeAPI";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { validjwt } from "../utils/fnc";
import { message, Modal, Rate } from "antd";
import { addreview, deletereview } from "../redux/features/review/reviewAPI";
import { modifyreview } from "../redux/features/review/reviewSlice";
import { updatereview as update } from "../redux/features/review/reviewAPI";
import { AddReservation } from "./AddReservation";
import {
  addreservation,
  deletereservation,
} from "../redux/features/reservation/reservationAPI";

export const Bike = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.login.user.role);
  const [bike, setbike] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  const [updatereview, setupdatereview] = useState({
    id: "",
    review: "",
    rating: 0,
  });

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t.toString().split(" GMT")[0];
  }
  useEffect(() => {
    validjwt(() =>
      dispatch(getbike({ id: id, success: (data) => setbike(data) }))
    );
  }, [dispatch, id]);

  return (
    <div className="d-flex gutter-s">
      <EditReview
        updatereview={updatereview}
        setupdatereview={setupdatereview}
        setIsModalVisible={setIsModalVisible}
        visible={isModalVisible}
      />
      <AddReservation
        visible={isModal2Visible}
        setvisible={setIsModal2Visible}
        id={id}
      />
      <div className="d-flex--c fullwidth ">
        <div className="box-shadow padding-lr-s padding-bottom-s ">
          <div>
            <h1 className="heading heading-m m0 p0">name : {bike?.name}</h1>
            <p className="p p-s m0 "> model :{bike?.model}</p>
            <p className="p p-s m0 "> location :{bike?.location}</p>
            <p className="p p-s m0 "> color :{bike?.color}</p>
            <Rate
              allowHalf
              defaultValue={bike?.rating}
              count={5}
              disabled={true}
              className="lightgray"
            />
          </div>
          <button
            className="btn btn-secondary margin-top-s"
            onClick={() => setIsModal2Visible(true)}
          >
            Add Reservations
          </button>
        </div>

        <div className="reviews  margin-top-s">
          <div className="d-flex justify-center margin-bottom-m">
            <Addreview id={id} />
          </div>
          {bike?.reviews.length && (
            <>
              <h3 className="heading-s text-center ">Reviews</h3>
              {bike?.reviews.map((review) => (
                <Review
                  key={review.id}
                  details={review}
                  popup={() => setIsModalVisible(true)}
                  updatereview={updatereview}
                  setupdatereview={setupdatereview}
                />
              ))}
            </>
          )}
        </div>
      </div>
      {bike?.reservations.length > 0 && (
        <div className="padding-lr-s box-shadow">
          <h2 className="heading heading-s text-center">Reservations</h2>
          <div className="d-flex--c gutter-s overflow-auto padding-bottom-x">
            {bike.reservations.map((reservation, i) => (
              <div className="border light-gray padding-lr-s padding-bottom-s padding-top-s">
                <div className="d-flex gutter-s">
                  <p className="p p-s">#{i + 1}</p>
                  <div className="d-flex--c overflow-h bg-white p p-s">
                    <p className="text-overflow p p-s">{reservation.id}</p>
                    <p>{toDateTime(reservation.duration)}</p>
                  </div>
                </div>
                {role === "admin" && (
                  <div className="admin d-flex gutter-s padding-lr-s justify-right">
                    <DeleteOutlined
                      className="btn btn-delete p-m"
                      onClick={() => {
                        validjwt(() =>
                          dispatch(deletereservation(reservation.id))
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Review = ({ details, popup, updatereview, setupdatereview }) => {
  const { id, from, rating, review, created_at } = details;
  const dispatch = useDispatch();
  const role = useSelector((state) => state.login.user.role);
  return (
    <div className="d-flex gutter-s box-shadow padding-lr-s padding-bottom-s padding-top-s">
      <div>
        <Avatar size={54} icon={<UserOutlined />} />
      </div>
      <div className="d-flex--c fullwidth">
        <p className="p p-s m0 p0">{from}</p>
        <Rate allowHalf defaultValue={rating} count={5} disabled={true} />
        <p className="p p-s m0 light-gray">{review}</p>
      </div>
      <p className="p m0 nowrap" style={{ alignSelf: "center" }}>
        {created_at}
      </p>
      {role === "admin" && (
        <div className="admin d-flex--c gutter-s padding-lr-s">
          <EditOutlined
            className="btn btn-edit p-m"
            onClick={() => {
              popup();
              setupdatereview({ ...updatereview, id: id });
            }}
          />
          <DeleteOutlined
            className="btn btn-delete p-m"
            onClick={() => validjwt(() => dispatch(deletereview(id)))}
          />
        </div>
      )}
    </div>
  );
};

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
  }

  return (
    <div
      className={
        "d-flex padding-lr-x padding-bottom-s padding-top-s gutter-s margin-bottom-s" +
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

const EditReview = ({
  updatereview,
  setupdatereview,
  setIsModalVisible,
  visible,
}) => {
  const dispatch = useDispatch();

  const handleOk = () => {
    if (!(updatereview.rating && updatereview.review.length)) {
      message.error("review and rating cannot be empty");
    } else {
      validjwt(() => dispatch(update(updatereview)));
    }
    setupdatereview({ review: "", rating: 0 });
    setIsModalVisible(false);
  };
  const close = () => {
    setupdatereview({ review: "", rating: 0 });
    setIsModalVisible(false);
  };
  return (
    <Modal
      title="Edit Review"
      visible={visible}
      onOk={handleOk}
      onCancel={close}
    >
      <Addreview type="edit" values={updatereview} update={setupdatereview} />
    </Modal>
  );
};
