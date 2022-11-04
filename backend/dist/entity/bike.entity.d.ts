import { BaseEntity } from "typeorm";
import { Reservation } from "./reservation.entity";
import { Review } from "./review.entity";
export declare class Bike extends BaseEntity {
    id: string;
    name: string;
    model: string;
    color: string;
    location: string;
    avgrating: number;
    reviews: Review[];
    reservations: Reservation[];
}
