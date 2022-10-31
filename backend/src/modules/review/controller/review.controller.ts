import { Body, Controller, Delete, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { jwtDto } from 'src/dto/jwt.dto';
import { Create_reviewdto, Update_reviewdto } from 'src/dto/review.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/role.guard';
import { ReviewService } from '../services/review.service';

@Controller('review')
@UseGuards(AuthGuard)
export class ReviewController {
    constructor(private readonly service : ReviewService){}
     
  @Post("/:id")
  @HttpCode(200)
  createreview(@Body() data: {data:Create_reviewdto, jwt:jwtDto}, @Param("id") id: string) {
    return this.service.createreview(id,data)
  }

  @Delete("/:id")
  @HttpCode(200)
  @Roles(["admin"])
  deletereview(@Param("id") id: string) {
    return this.service.deletereview(id)
  }

  @Patch("/:id")
  @HttpCode(200)
  @Roles(["admin"])
  updatereview(@Param("id") id: string, @Body() data: {data:Update_reviewdto, jwt:jwtDto}) {
    return this.service.updatereview(id,data)
  }
}
