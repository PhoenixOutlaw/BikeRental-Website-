import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { jwtDto } from "src/dto/jwt.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ReservationService } from "../services/reservation.service";

@Controller("reservation")
@UseGuards(AuthGuard)
export class ReservationController {
  constructor(private readonly service: ReservationService){}
  
  @Post("/:id")
  makeresrvation(@Body() data: any , @Param("id") id: string) {
    return this.service.makereservation(id,data)
  }

  @Delete("/:id")
  deleteresrvation(@Param("id") id: string) {
    return this.service.deletereservation(id)
  }

  @Patch("/:id")
  updateresrvation(@Param("id") id: string, @Body() data: any) {
    return this.service.updatereservation(id,data.data.duration)
  }
}
