import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "src/entity/reservation.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationrepo: Repository<Reservation>
  ) {}

  async makereservation(id: string, data: any) {
    try {
      const new_reservation = this.reservationrepo.create({
        ...data.data,
        bike: id,
        user: data.jwt.id,
      });
      const res = await this.reservationrepo.save(new_reservation);
      return res;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  async deletereservation(id: string) {
    try {
      const exist = await this.reservationrepo.findBy({ id: id });
      if (!exist.length)
        throw new HttpException("no reservation found", HttpStatus.NOT_FOUND);
      const res = await this.reservationrepo.delete({ id: id });
      return "Reservation deleted";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updatereservation(id: string,data: any) {
    try {
      const exist = await this.reservationrepo.findBy({ id: id });
      if (!exist.length)
        throw new HttpException("no reservation found", HttpStatus.NOT_FOUND);
      await this.reservationrepo
        .createQueryBuilder()
        .update()
        .set({ duration:data })
        .where({ id: id })
        .execute();
      return "Reservation Updated";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
