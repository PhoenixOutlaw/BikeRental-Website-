import { useDispatch } from "react-redux";
import { validjwt } from "../../utils/fnc";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getuser } from "../../redux/features/admin/apis/userapi";
import {
  deletereservation,
  updatereservation,
} from "../../redux/features/reservation/reservationAPI";

const ReservationCard = ({ data, storedUser, user, id, setUser }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  function getUser() {
    validjwt(() =>
      dispatch(
        getuser({
          id: id ? id : user.id,
          success: (data) => setUser(data),
        })
      )
    );
  }

  function onCancelReservation() {
    validjwt(() =>
      dispatch(
        updatereservation({
          id: data.id,
          updates: { active: false },
          success: getUser,
        })
      )
    );
  }

  function onDeleteReservation() {
    validjwt(() =>
      dispatch(
        deletereservation({
          id: data.id,
          success: getUser,
        })
      )
    );
  }

  return (
    <div className=" border d-flex gutter-s margin-bottom-s padding-bottom-s padding-top-s padding-lr-s">
      <div>
        <p className="p p-s m0">name: {data.bike.name}</p>
        <p className="p p-s m0">model: {data.bike.model}</p>
        {data.active ? (
          <p className="p p-s text dot dot--green">active</p>
        ) : (
          <p className="p p-s text dot dot--red">canceled</p>
        )}
        <p className="p p-s m0 red">from: {data.from}</p>
        <p className="p p-s m0 red">to: {data.to}</p>
        <div className="d-flex gutter-s">
          {data.active && storedUser.id === user.id && (
            <button
              className="btn btn-secondary margin-top-s "
              onClick={onCancelReservation}
            >
              cancel
            </button>
          )}
          <button
            className="btn btn-secondary margin-top-s"
            onClick={() => nav(`/bike/${data.bike.id}`)}
          >
            show more
          </button>
        </div>
      </div>
      {storedUser.id === user.id && (
        <div>
          <DeleteOutlined
            className="btn btn-delete font-size-1"
            onClick={onDeleteReservation}
          />
        </div>
      )}
    </div>
  );
};
export default ReservationCard;
