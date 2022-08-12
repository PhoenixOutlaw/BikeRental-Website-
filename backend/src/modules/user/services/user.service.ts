import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database";
import { Serialized_user } from "src/dto/user.dto";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userrepo: Repository<User>
  ) {}

  async getallusers() {
    try {
      const users = await this.userrepo.find();
      return users.map((user) => new Serialized_user(user));
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NO_CONTENT);
    }
  }

  async getuser(id: string) {
    try {
      const user = await this.userrepo.findOne({where:{ id: id },relations:['reservations.bike']});
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
      if (user === null)
        throw new HttpException("No user found", HttpStatus.NOT_FOUND);
        await this.userrepo.delete({ id: id });
      return "User Deleted";
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async updateuser(id: string, data: any) {
    try {
      const res = await this.userrepo.findBy({ id: id });
      if (!res.length)
        throw new HttpException("id does not exist", HttpStatus.NOT_FOUND);
      await this.userrepo
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
