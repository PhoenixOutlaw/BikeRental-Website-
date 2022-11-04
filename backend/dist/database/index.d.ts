import { Bike } from "src/entity/bike.entity";
import { Reservation } from "src/entity/reservation.entity";
import { Review } from "src/entity/review.entity";
import { User } from "src/entity/user.entity";
declare const entities: (typeof Review | typeof Bike | typeof User | typeof Reservation)[];
export { User };
export default entities;
