import { Reservation } from "src/entity/reservation.entity";
import { Review } from "src/entity/review.entity";
import { Repository } from "typeorm";
export declare class ReviewService {
    private readonly reviewrepo;
    private readonly reservationrepo;
    constructor(reviewrepo: Repository<Review>, reservationrepo: Repository<Reservation>);
    createreview(id: string, data: any): Promise<string>;
    deletereview(id: string): Promise<string>;
    updatereview(id: string, data: any): Promise<string>;
}
