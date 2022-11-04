import { Reservation } from "src/entity/reservation.entity";
import { Repository } from "typeorm";
export declare class ReservationService {
    private readonly reservationrepo;
    constructor(reservationrepo: Repository<Reservation>);
    getreservation(id: string): Promise<Reservation[]>;
    makereservation(id: string, data: any): Promise<Reservation[]>;
    deletereservation(id: string): Promise<string>;
    updatereservation(id: string, data: any): Promise<string>;
}
