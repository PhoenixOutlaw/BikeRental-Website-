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

  async getallbike() {
    try {
      const res = await this.bikerepo.find();
      return res;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getbike(id: string, role: string) {
    const relations = ['reviews'];
    if(role === "admin")
    relations.push('reservations');
    console.log(relations)
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
