import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as jwt from "jsonwebtoken";
import { User } from "src/database";
import {
  Create_UserDto,
  Serialized_user,
  Signin_userdto,
} from "src/dto/user.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async register(data: Create_UserDto) {
    const hashpassword = await bcrypt.hash(data.password, 10);
    const user = this.user.create({
      ...data,
      email: data.email.toLowerCase(),
      role: data.role ? data.role : "regular",
      password: hashpassword,
    });

    try {
      const res = await this.user.save(user);
      const token = jwt.sign(
        { id: res.id, role: res.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACTIVE_DURATION }
      );

      return { jwttoken: token, user: new Serialized_user(res) };
    } catch (err) {
      throw new HttpException("Email already exsits", HttpStatus.CONFLICT);
    }
  }

  async signin(data: Signin_userdto) {
    try {
      const res = await this.user.findOneByOrFail({ email: data.email });
      if (!(await bcrypt.compare(data.password, res.password))) {
        throw new HttpException("Password incorrect", HttpStatus.FORBIDDEN);
      }
      const token = jwt.sign(
        { id: res.id, role: res.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACTIVE_DURATION }
      );
      return { jwttoken: token, user: new Serialized_user(res) };
    } catch (err) {
      throw new HttpException(
        err.response ? err.response : "Email does not exsits",
        err.status ? err.status : HttpStatus.NOT_FOUND
      );
    }
  }

  async getloggeduser(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const res = await this.user.findOneByOrFail({ id: data.id });
      return new Serialized_user(res);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
  }
}
