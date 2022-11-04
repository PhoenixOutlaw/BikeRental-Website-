import { Bike } from "./bike.entity";
import { User } from "./user.entity";
export declare class Review {
    id: string;
    from: string;
    rating: number;
    review: string;
    created_at: Date;
    bike: Bike;
    user: User;
}
