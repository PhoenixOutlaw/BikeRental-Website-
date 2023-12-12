const ReservationCard = ({ reservations }) => {
  return (
    <div className="padding-lr-s box-shadow padding-top-s">
      <h2 className="heading heading-s text-center">Reservations</h2>
      <div className="d-flex--c gutter-s overflow-auto padding-bottom-x">
        {reservations.map((reservation, i) => (
          <div
            className="border light-gray padding-lr-s padding-bottom-s padding-top-s"
            key={reservation.id}
          >
            <div className="d-flex gutter-s">
              <p className="p p-s">#{i + 1}</p>
              <div className="d-flex--c overflow-h bg-white p p-s">
                <p className="text-overflow p p-s">{reservation.id}</p>
                {reservation.active ? (
                  <p className="p p-s text dot dot--green">active</p>
                ) : (
                  <p className="p p-s text dot dot--red">canceled</p>
                )}
                <p className="nowrap">from : {reservation.from}</p>
                <p className="nowrap">to : {reservation.to}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationCard;
