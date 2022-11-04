import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { Bike } from "src/entity/bike.entity";
import { Reservation } from "src/entity/reservation.entity";
import { Repository } from "typeorm";
export declare class BikesService {
    private readonly bikerepo;
    private readonly reservationrepo;
    constructor(bikerepo: Repository<Bike>, reservationrepo: Repository<Reservation>);
    createnew(data: Create_Bikedto): Promise<Bike>;
    getallbike(params: any, data: any): Promise<{
        total: number;
        data: {
            available: [Bike[], number];
            unavailable: Bike[];
        };
    }>;
    getbike(id: string, role: string): Promise<Bike>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
    update(id: string, data: Update_Bikedto): Promise<string>;
}
