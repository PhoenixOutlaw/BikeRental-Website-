import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { jwtDto } from "src/dto/jwt.dto";
import {
  Create_reservationdto,
  Update_reservationdto,
} from "src/dto/reservation.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
@UseGuards(AuthGuard)
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Get("/:id")
  @HttpCode(200)
  getresrvation(@Param("id") id: string) {
    return this.service.getreservation(id);
  }

  @Post("/:id")
  @HttpCode(200)
  makeresrvation(
    @Body() data: { data: Create_reservationdto, jwt: jwtDto },
    @Param("id") id: string
  ) {
    return this.service.makereservation(id, data);
  }

  @Delete("/:id")
  @HttpCode(200)
  deleteresrvation(@Param("id") id: string) {
    return this.service.deletereservation(id);
  }

  @Patch("/:id")
  @HttpCode(200)
  updateresrvation(
    @Param("id") id: string,
    @Body() data: { data: Update_reservationdto, jwt: jwtDto }
  ) {
    return this.service.updatereservation(id, data);
  }
}
