import { BaseEntity } from "typeorm";
import { Reservation } from "./reservation.entity";
import { Review } from "./review.entity";
export declare class User extends BaseEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    password: string;
    role: string;
    reservations: Reservation[];
    reviews: Review[];
}
