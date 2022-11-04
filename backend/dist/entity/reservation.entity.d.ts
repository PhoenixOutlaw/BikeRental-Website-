import { BaseEntity } from "typeorm";
import { Bike } from "./bike.entity";
import { User } from "./user.entity";
export declare class Reservation extends BaseEntity {
    id: string;
    from: Date;
    to: Date;
    active: boolean;
    created_at: Date;
    bike: Bike;
    user: User;
}
