import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { jwtDto } from "src/dto/jwt.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard, Roles } from "src/guards/role.guard";
import { BikesService } from "../services/bikes.service";


@Controller("bike")
@UseGuards(AuthGuard)
export class BikesController {
  constructor(private service: BikesService) {}

  @Get()
  @HttpCode(200)
  getallbikes(@Query() params: any, @Body() data: { jwt: jwtDto }) {
    return this.service.getallbike(params, data);
  }

  @Get("/:id")
  @HttpCode(200)
  getbike(@Param("id") id: string, @Body() data: { jwt: jwtDto }) {
    return this.service.getbike(id, data.jwt.role);
  }

  @Post()
  @HttpCode(200)
  @Roles("admin")
  @UseGuards(RoleGuard)
  create(@Body() data: { data: Create_Bikedto, jwt: jwtDto }) {
    return this.service.createnew(data.data);
  }
  @Patch("/:id")
  @HttpCode(200)
  @Roles("admin")
  @UseGuards(RoleGuard)
  update(
    @Param("id") id: string,
    @Body() data: { data: Update_Bikedto, jwt: jwtDto }
  ) {
    return this.service.update(id, data.data);
  }
  @Delete("/:id")
  @HttpCode(200)
  @Roles("admin")
  @UseGuards(RoleGuard)
  delete(@Param("id") id: string) {
    return this.service.delete(id);
  }
}
