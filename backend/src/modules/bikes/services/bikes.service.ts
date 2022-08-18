import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { Bike } from "src/entity/bike.entity";
import { Repository } from "typeorm";

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike) private readonly bikerepo: Repository<Bike>
  ) {}

  async createnew(data: Create_Bikedto) {
    const bike = this.bikerepo.create(data);
    try {
      const res = await this.bikerepo.save(bike);
      return res;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getallbike(params: any) {
    try {
      const pagination = {
        page: parseInt(params.page) || 1,
        limit: parseInt(params.limit) || 10,
      };
    
      const offset = (pagination.page - 1) * pagination.limit;
      const query =
        (params.search ? "name like :name" : "") +
        (params.search && params.rating ? " AND " : "") +
        (params.rating ? "avgrating>=:rating" : "");
      const total = await this.bikerepo.createQueryBuilder().getCount()
      const res = await this.bikerepo.createQueryBuilder()
      .where(query, { name: `%${params.search}%`, rating: params.rating })
      .offset(offset)
      .limit(pagination.limit)
      .getMany();
      return {total,data: res};
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getbike(id: string, role: string) {
    const relations = ['reviews'];
    if(role === "admin")
    relations.push('reservations');
    try {
      const res = await this.bikerepo.findOneOrFail({ where: { id: id }, relations:relations });
      return res;
    } catch (err) {
      throw new HttpException("No Bike Found", HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string) {
    try {
      const res = await this.bikerepo.delete({ id: id });
      return res;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, data: Update_Bikedto) {
    try {
      const res = await this.bikerepo.findBy({ id: id });
      if (!res.length)
        throw new HttpException("id does not exist", HttpStatus.NOT_FOUND);
      await this.bikerepo
        .createQueryBuilder()
        .update()
        .set({ ...data })
        .where({ id: id })
        .execute();
      return "updated";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
