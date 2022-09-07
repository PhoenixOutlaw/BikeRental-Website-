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

  async getreservation(id: string) {
    try {
      const res = await this.reservationrepo.find({
        where: { user: { id: id } },
        relations: ["bike"],
      });

      if (!res)
        throw new HttpException("no reservation found", HttpStatus.NOT_FOUND);
      return res;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async makereservation(id: string, data: any) {
    try {
      const reserved = await this.reservationrepo
        .createQueryBuilder("reservation")
        .where(
          "reservation.bikeId = :id and ((reservation.from BETWEEN :from and :to  or reservation.to BETWEEN :from and :to) or (reservation.from <:from and reservation.to >:to))",
          { from: data.data.from, to: data.data.to, id: id }
        )
        // .andWhere("reservation.from BETWEEN :from and :to  or reservation.to BETWEEN :from and :to", { from: data.data.from,to: data.data.to})
        // .orWhere("(reservation.from <:from and reservation.to >:to)", { from: data.data.from ,  to: data.data.to})                                   ask??
        .getOne();
      if (reserved) {
        throw new HttpException(
          "Bike Already reserved for the given reservation",
          HttpStatus.CONFLICT
        );
      }
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
      await this.reservationrepo.delete({ id: id });
      return "Reservation deleted";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updatereservation(id: string, data: any) {
    try {
      const exist = await this.reservationrepo.findOne({
        where: { id: id },
        relations: ["user"],
      });
      if (data.jwt.id !== exist.user.id)
        throw new HttpException(
          "Only the owner of the reservation can perform this action",
          HttpStatus.FORBIDDEN
        );
      if (!exist)
        throw new HttpException("no reservation found", HttpStatus.NOT_FOUND);
      await this.reservationrepo
        .createQueryBuilder()
        .update()
        .set({ active: data.data.active })
        .where({ id: id })
        .execute();
      return "Reservation Updated";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
