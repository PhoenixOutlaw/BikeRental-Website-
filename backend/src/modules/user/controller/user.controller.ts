import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard, Roles } from "src/guards/role.guard";
import { UserService } from "../services/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./multerconfig";
import * as jwt from "jsonwebtoken";

@Controller("user")
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly services: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles("admin")
  getallusers(@Query() params: any) {
    return this.services.getallusers(params);
  }

  @Get("/:id")
  @HttpCode(200)
  @UseGuards(RoleGuard)
  getuser(@Param("id") id: string , @Body() data: any) {
    return this.services.getuser(id,data);
  }

  @Delete("/:id")
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles("admin")
  deleteuser(@Param("id") id: string) {
    return this.services.deleteuser(id);
  }
  
  @Patch("/:id")
  @HttpCode(200)
  @UseGuards(RoleGuard)
  modifyuser(@Param("id") id: string, @Body() data: any) {
    return this.services.updateuser(id, data);
  }
}
