import {
  Body,
  Req,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard, Roles } from "src/guards/role.guard";
import { UserService } from "../services/user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions} from "../../../multerconfig/multerconfig";
import * as jwt from "jsonwebtoken";

@Controller("user")
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly services: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles(["admin"])
  getallusers(@Query() params: any) {
    return this.services.getallusers(params);
  }

  @Get("/:id")
  @HttpCode(200)
  getuser(@Param("id") id: string , @Body() data: any) {
    return this.services.getuser(id,data);
  }

  @Delete("/:id")
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles(["admin"])
  deleteuser(@Param("id") id: string) {
    return this.services.deleteuser(id);
  }
  
  @Patch("/:id")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image',multerOptions))
  modifyuser(@Param("id") id: string, @Req() req:any, @UploadedFile() file:  Express.Multer.File) {
    const token = req.headers.authorization?.split(" ")[1];
    const jwtd = jwt.verify(token, process.env.JWT_SECRET);
    const data = {...req.body}
    file?data.image=file.filename:delete data.image;
    return this.services.updateuser(id,{data,jwt:jwtd})
  }
}
