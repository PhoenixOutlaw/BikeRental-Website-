import { jwtDto } from "src/dto/jwt.dto";
import { Create_reservationdto, Update_reservationdto } from "src/dto/reservation.dto";
import { ReservationService } from "../services/reservation.service";
export declare class ReservationController {
    private readonly service;
    constructor(service: ReservationService);
    getresrvation(id: string): Promise<import("../../../entity/reservation.entity").Reservation[]>;
    makeresrvation(data: {
        data: Create_reservationdto;
        jwt: jwtDto;
    }, id: string): Promise<import("../../../entity/reservation.entity").Reservation[]>;
    deleteresrvation(id: string): Promise<string>;
    updateresrvation(id: string, data: {
        data: Update_reservationdto;
        jwt: jwtDto;
    }): Promise<string>;
}
