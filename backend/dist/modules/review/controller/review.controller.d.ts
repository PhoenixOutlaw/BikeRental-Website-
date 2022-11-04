import { jwtDto } from 'src/dto/jwt.dto';
import { Create_reviewdto, Update_reviewdto } from 'src/dto/review.dto';
import { ReviewService } from '../services/review.service';
export declare class ReviewController {
    private readonly service;
    constructor(service: ReviewService);
    createreview(data: {
        data: Create_reviewdto;
        jwt: jwtDto;
    }, id: string): Promise<string>;
    deletereview(id: string): Promise<string>;
    updatereview(id: string, data: {
        data: Update_reviewdto;
        jwt: jwtDto;
    }): Promise<string>;
}
