import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bike } from "src/entity/bike.entity";
import { Reservation } from "src/entity/reservation.entity";
import { Review } from "src/entity/review.entity";
import { avgrating } from "src/util/ratingfnd";
import { Repository } from "typeorm";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewrepo: Repository<Review>,
    @InjectRepository(Reservation)
    private readonly reservationrepo: Repository<Reservation>
  ) {}

  async createreview(id: string, data: any) {
    try {
      const reservation = await this.reservationrepo
        .createQueryBuilder("reservation")
        .where("bikeId= :id and userId= :userId", {
          id: id,
          userId: data.jwt.id,
        })
        .getOne();      
      if (!reservation) {
        throw new HttpException(
          "You need to reserve this bike to review it",
          HttpStatus.NOT_ACCEPTABLE
        );
      }
      if (!reservation.active) {
        throw new HttpException(
          "You cant review canceled reservation",
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      const reviews = await this.reviewrepo
        .createQueryBuilder("review")
        .where("review.bikeId=:id and review.userId=:uid", {
          id: id,
          uid: data.jwt.id,
        })
        .getMany();
      if (reviews.length > 0)
        throw new HttpException(
          "You have already reviewed the bike ",
          HttpStatus.CONFLICT
        );

      const new_review = this.reviewrepo.create({
        bike: id,
        user: data.jwt.id,
        ...data.data,
      });
      avgrating({ id: id, newrating: data.data.rating, method: "add" });
      await this.reviewrepo.save(new_review);
      return "review added successfully";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deletereview(id: string) {
    try {
      const exist = await this.reviewrepo.findOne({
        where: { id: id },
        relations: ["bike"],
      });
      if (!exist)
        throw new HttpException("no review found", HttpStatus.NOT_FOUND);
      avgrating({
        id: exist.bike.id,
        newrating: exist.bike.avgrating,
        method: "delete",
      });
      await this.reviewrepo.delete({ id: id });
      return "Review deleted";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updatereview(id: string, data: any) {
    try {
      const exist = await this.reviewrepo.findOne({
        where: { id: id },
        relations: ["bike"],
      });

      if (!exist)
        throw new HttpException("no review found", HttpStatus.NOT_FOUND);
      await this.reviewrepo
        .createQueryBuilder()
        .update()
        .set({ ...data.data })
        .where({ id: id })
        .execute();

      avgrating({
        id: exist.bike.id,
        newrating: data.data.rating,
        oldrating: exist.bike.avgrating,
      });
      return "Review Updated";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
