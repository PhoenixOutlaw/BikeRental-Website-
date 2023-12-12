import { updatereview as update } from "../../redux/features/review/reviewAPI";
import { validjwt } from "../../utils/fnc";
import { useDispatch } from "react-redux";
import { message, Modal } from "antd";
import Addreview from "./Addreview";

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

export default EditReview;
