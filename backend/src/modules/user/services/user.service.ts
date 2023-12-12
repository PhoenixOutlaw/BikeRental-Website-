import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as fs from "fs";
import { User } from "src/database";
import { Serialized_user } from "src/dto/user.dto";
import { multerConfig } from "src/multerconfig/multerconfig";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userrepo: Repository<User>
  ) {}

  async getallusers(params: any) {
    try {
      const pagination = {
        page: params.page !== null ? 1 : parseInt(params.page),
        limit: params.limit !== null ? 10 : parseInt(params.limit),
      };
      const offset = (pagination.page - 1) * pagination.limit;
      const total = await this.userrepo.createQueryBuilder().getCount();
      let query = this.userrepo.createQueryBuilder();
      if (params.search)
        query = query.andWhere("email like :email", {
          email: `%${params.search}%`,
        });
      const users = await query
        .offset(offset)
        .limit(pagination.limit)
        .getMany();
      return {
        total: total,
        users: users.map((user) => new Serialized_user(user)),
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NO_CONTENT);
    }
  }

  async getuser(id: string, data: any) {
    try {
      if (data.jwt.role === "regular" && id !== data.jwt.id) {
        throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN);
      }
      const user = await this.userrepo.findOne({
        where: { id: id },
        relations: ["reservations.bike"],
      });
      if (user === null)
        throw new HttpException("No user found", HttpStatus.NOT_FOUND);
      return new Serialized_user(user);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async deleteuser(id: string) {
    try {
      const user = await this.userrepo.findOneBy({ id: id });
      if (!user) throw new HttpException("No user found", HttpStatus.NOT_FOUND);
      await this.userrepo.delete({ id: id });
      return "User Deleted";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateuser(id: string, data: any) {
    if (["regular", "manager"].includes(data.jwt.role) && id !== data.jwt.id) {
      throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN);
    }
    if (["regular", "manager"].includes(data.jwt.role) && data.data.role) {
      delete data.data.role;
    }
    if (data.data.email) data.data.email = data.data.email.toLowerCase();
    try {
      const res = await this.userrepo.findOneBy({ id: id });
      if (!res)
        throw new HttpException("id does not exist", HttpStatus.NOT_FOUND);
      if (data.data.email && res.email !== data.data.email) {
        const res = await this.userrepo.findOneBy({ email: data.data.email });
        if (res)
          throw new HttpException("Email Already Exists", HttpStatus.CONFLICT);
      }
      if (data.data.image && res.image) {
        fs.unlink(`${multerConfig.dest}/${res.image}`,()=>null);
      }
      await this.userrepo
        .createQueryBuilder()
        .update()
        .set({ ...data.data })
        .where({ id: id })
        .execute();
      return "updated";

    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
