import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { Bike } from "src/entity/bike.entity";
import { Reservation } from "src/entity/reservation.entity";
import { Brackets, Repository } from "typeorm";

@Injectable()
export class BikesService {
  constructor(
    @InjectRepository(Bike) private readonly bikerepo: Repository<Bike>,
    @InjectRepository(Reservation)
    private readonly reservationrepo: Repository<Reservation>
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

  async getallbike(params: any, data: any) {
    try {
      const pagination = {
        page: params.page !== null ? 1 : parseInt(params.page),
        limit: params.limit !== null ? 10 : parseInt(params.limit),
      };
      const offset = (pagination.page - 1) * pagination.limit;
      const total = await this.bikerepo.createQueryBuilder().getCount();
      if (!params.from && !params.to) {
        return { data: { available: [], unavailable: [] } };
      }

      const filterquery = this.bikerepo
        .createQueryBuilder("bike")
        .leftJoinAndSelect("bike.reservations", "reservation")
        .andWhere(
          new Brackets((qb) => {
            if (params.rating)
              qb.andWhere("bike.avgrating >= :rating", {
                rating: parseInt(params.rating),
              });
            if (params.name) {
              qb.andWhere("bike.name like :name", {
                name: `%${params.name}%`,
              });
            }
            if (params.model)
              qb.andWhere("bike.model like :model", {
                model: `%${params.model}%`,
              });
            if (params.color)
              qb.andWhere("color like :color", {
                color: `${params.color}`,
              });
            if (params.location)
              qb.andWhere("bike.location like :location", {
                location: `%${params.location}%`,
              });
          })
        );
      const reserved = await filterquery
        .andWhere(
          new Brackets((qb) => {
            qb.orWhere("reservation.from BETWEEN :from and :to ", {
              from: params.from,
              to: params.to,
            })
              .orWhere("reservation.to BETWEEN :from and :to", {
                from: params.from,
                to: params.to,
              })
              .orWhere("reservation.from < :from and reservation.to >:to", {
                from: params.from,
                to: params.to,
              });
          })
        )
        .getMany();

      let query = this.bikerepo
        .createQueryBuilder("bike")
        .where("")
        .andWhere(
          new Brackets((qb) => {
            if (params.rating)
              qb.andWhere("bike.avgrating >= :rating", {
                rating: parseInt(params.rating),
              });
            if (params.name) {
              qb.andWhere("bike.name like :name", {
                name: `%${params.name}%`,
              });
            }
            if (params.model)
              qb.andWhere("bike.model like :model", {
                model: `%${params.model}%`,
              });
            if (params.color)
              qb.andWhere("color like :color", {
                color: `${params.color}`,
              });
            if (params.location)
              qb.andWhere("bike.location like :location", {
                location: `%${params.location}%`,
              });
          })
        );
      if (reserved.length) {
        query = query.andWhere("bike.id NOT IN (:reserved)", {
          reserved: reserved.map((e) => e.id),
        });
      }

      const available = await query
        .offset(offset)
        .limit(pagination.limit)
        .getMany();
      return {
        total,
        data: {
          available: available,
          unavailable: data.jwt === "admin" ? reserved : [],
        },
      };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async getbike(id: string, role: string) {
    const relations = ["reviews"];
    if (role === "admin") relations.push("reservations");
    try {
      const res = await this.bikerepo.findOneOrFail({
        where: { id: id },
        relations: relations,
      });
      return res;
    } catch (err) {
      throw new HttpException("No Bike Found", HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string) {
    try {
      const exist = await this.bikerepo.findBy({ id: id });
      if (!exist.length)
        throw new HttpException("id does not exist", HttpStatus.NOT_FOUND);
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
