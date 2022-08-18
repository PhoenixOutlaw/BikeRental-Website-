import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  HttpCode,
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
  @HttpCode(200)
  signin(@Body() data: Signin_userdto): any {
    return this.authService.signin(data);
  }
  
  @Post("register")
  @HttpCode(200)
  register(@Body() data: Create_UserDto): any {
    return this.authService.register(data);
  }
  
  @Get("logged")
  @HttpCode(200)
  getloggeduser(@Headers() jwt: any): any {
    return this.authService.getloggeduser(jwt.authorization.split(" ")[1]);
  }
}
