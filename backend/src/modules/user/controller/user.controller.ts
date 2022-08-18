import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard, Roles } from "src/guards/role.guard";
import { UserService } from "../services/user.service";

@Controller("user")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly services: UserService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles("admin")
  getallusers() {
    return this.services.getallusers();
  }

  @Get("/:id")
  @HttpCode(200)
  @UseGuards(RoleGuard)
  @Roles("admin")
  getuser(@Param("id") id: string) {
    return this.services.getuser(id);
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
  @Roles("admin")
  modifyuser(@Param("id") id: string, @Body() data: any) {
    return this.services.updateuser(id, data.data);
  }
}
