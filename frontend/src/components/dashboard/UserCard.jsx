import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setcurrentuser } from "../../redux/features/admin/adminSlice";
import { deleteuser } from "../../redux/features/admin/apis/userapi";
import { validjwt } from "../../utils/fnc";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const UserCard = ({ user, setupdatevisible }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  function onEdit() {
    dispatch(setcurrentuser(user));
    setupdatevisible(true);
  }
  function onDelete() {
    validjwt(() => dispatch(deleteuser(user.id)));
  }
  return (
    <div
      key={user.id}
      className="d-flex box-shadow p p-s padding-lr-m padding-top-s padding-bottom-s justify-sb margin-bottom-s"
    >
      <div>
        <p className="m0">Id : {user.id}</p>
        <p className="m0">
          Name : {user.firstName} {user.lastName}
        </p>
        <p className="m0">Email : {user.email}</p>
        <p className="m0">Role : {user.role}</p>
      </div>
      <div className="admin d-flex--c gutter-s padding-lr-s justify-right">
        <EditOutlined className="btn btn-edit p-m" onClick={onEdit} />
        <DeleteOutlined className="btn btn-delete p-m" onClick={onDelete} />
        <button
          className="btn btn-secondary"
          onClick={() => {
            nav(`/user/${user.id}`);
          }}
        >
          More details
        </button>
      </div>
    </div>
  );
};

export default UserCard;
