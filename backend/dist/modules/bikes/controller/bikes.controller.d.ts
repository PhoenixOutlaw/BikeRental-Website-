import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { jwtDto } from "src/dto/jwt.dto";
import { BikesService } from "../services/bikes.service";
export declare class BikesController {
    private service;
    constructor(service: BikesService);
    getallbikes(params: any, data: {
        jwt: jwtDto;
    }): Promise<{
        total: number;
        data: {
            available: [import("../../../entity/bike.entity").Bike[], number];
            unavailable: import("../../../entity/bike.entity").Bike[];
        };
    }>;
    getbike(id: string, data: {
        jwt: jwtDto;
    }): Promise<import("../../../entity/bike.entity").Bike>;
    create(data: {
        data: Create_Bikedto;
        jwt: jwtDto;
    }): Promise<import("../../../entity/bike.entity").Bike>;
    update(id: string, data: {
        data: Update_Bikedto;
        jwt: jwtDto;
    }): Promise<string>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
