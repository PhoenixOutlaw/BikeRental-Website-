import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "src/entity/review.entity";
import { Repository } from "typeorm";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private readonly reviewrepo: Repository<Review>
  ) {}

  async createreview(id: string, data: any) {
    try {
      const new_review = this.reviewrepo.create({
        bike: id,
        ...data.data,
      });
      await this.reviewrepo.save(new_review);
      return "review added successfully";
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  async deletereview(id: string) {
    try {
      const exist = await this.reviewrepo.findBy({ id: id });
      if (!exist.length)
        throw new HttpException("no review found", HttpStatus.NOT_FOUND);
      await this.reviewrepo.delete({ id: id });
      return "Review deleted";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updatereview(id: string, data: any) {
    try {
      const exist = await this.reviewrepo.findBy({ id: id });
      if (!exist.length)
        throw new HttpException("no review found", HttpStatus.NOT_FOUND);
      await this.reviewrepo
        .createQueryBuilder()
        .update()
        .set({ ...data.data })
        .where({ id: id })
        .execute();
      return "Review Updated";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
