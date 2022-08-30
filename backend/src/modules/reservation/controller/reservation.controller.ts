import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { jwtDto } from "src/dto/jwt.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
@UseGuards(AuthGuard)
export class ReservationController {
  constructor(private readonly service: ReservationService){}
  
  @Get("/:id")
  @HttpCode(200)
  getresrvation(@Param("id") id: string) {
    return this.service.getreservation(id)
  }

  @Post("/:id")
  @HttpCode(200)
  makeresrvation(@Body() data: any , @Param("id") id: string) {
    return this.service.makereservation(id,data)
  }

  @Delete("/:id")
  @HttpCode(200)
  deleteresrvation(@Param("id") id: string) {
    return this.service.deletereservation(id)
  }

  @Patch("/:id")
  @HttpCode(200)
  updateresrvation(@Param("id") id: string, @Body() data: any) {
    return this.service.updatereservation(id,data.data)
  }
}
