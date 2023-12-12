import Avatar from "antd/lib/avatar/avatar";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { validjwt } from "../../utils/fnc";
import { deletereview } from "../../redux/features/review/reviewAPI";

const ReviewCard = ({ details, popup, updatereview, setupdatereview }) => {
  const { id, from, rating, review, created_at } = details;
  const dispatch = useDispatch();
  const role = useSelector((state) => state.login.user.role);
  return (
    <div className="d-flex gutter-s box-shadow padding-lr-s padding-bottom-s padding-top-s margin-bottom-s">
      <div>
        <Avatar size={54} icon={<UserOutlined />} />
      </div>
      <div className="d-flex--c fullwidth">
        <p className="p p-s m0 p0">{from}</p>
        <Rate allowHalf defaultValue={rating} count={5} disabled={true} />
        <p className="p p-s m0 light-gray">{review}</p>
      </div>
      <p className="p m0 nowrap self-center">{created_at}</p>
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

export default ReviewCard;
