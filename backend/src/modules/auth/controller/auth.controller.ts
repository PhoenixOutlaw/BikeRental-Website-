import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Header,
  Headers,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { Create_UserDto, Signin_userdto } from "src/dto/user.dto";
import { AuthService } from "../services/Auth.service";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  signin(@Body() data: Signin_userdto): any {
    return this.authService.signin(data);
  }

  @Post("logged")
  getloggeduser(@Headers() jwt:any): any {
    return this.authService.getloggeduser(jwt.authorization.split(' ')[1])
  }

  @Post("register")
  register(@Body() data: Create_UserDto): any {
    return this.authService.register(data);
  }
}
