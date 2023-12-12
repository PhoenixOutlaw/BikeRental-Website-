import { getbike } from "../redux/features/bikes/bikeAPI";
import { useDispatch, useSelector } from "react-redux";
import ReservationCard from "../components/bike/ReservationCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditReview from "../components/bike/Editreview";
import ReviewCard from "../components/bike/ReviewCard";
import Addreview from "../components/bike/Addreview";
import { validjwt } from "../utils/fnc";
import { Rate } from "antd";

const Bike = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bike = useSelector((state) => state.bike.currentbike);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatereview, setupdatereview] = useState({
    id: "",
    review: "",
    rating: 0,
  });

  useEffect(() => {
    validjwt(() => dispatch(getbike(id)));
  }, [dispatch, id]);

  return (
    <div className="d-flex gutter-s">
      <EditReview
        updatereview={updatereview}
        setupdatereview={setupdatereview}
        setIsModalVisible={setIsModalVisible}
        visible={isModalVisible}
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
              value={bike?.avgrating}
              count={5}
              disabled={true}
              className="lightgray"
            />
          </div>
        </div>

        <div className="reviews  margin-top-s">
          <div className="d-flex justify-center margin-bottom-s">
            <Addreview id={id} />
          </div>
          {bike?.reviews?.length && (
            <div className="padding-bottom-m">
              <h3 className="heading-s text-center ">Reviews</h3>
              {bike?.reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  details={review}
                  popup={() => setIsModalVisible(true)}
                  updatereview={updatereview}
                  setupdatereview={setupdatereview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {bike?.reservations?.length > 0 ? <ReservationCard reservations={bike.reservations} /> : null}
    </div>
  );
};

export default Bike;
