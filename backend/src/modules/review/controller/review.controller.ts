import { Body, Controller, Delete, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReviewService } from '../services/review.service';

@Controller('review')
@UseGuards(AuthGuard)
export class ReviewController {
    constructor(private readonly service : ReviewService){}
     
  @Post("/:id")
  @HttpCode(200)
  createreview(@Body() data: any, @Param("id") id: string) {
    return this.service.createreview(id,data)
  }

  @Delete("/:id")
  @HttpCode(200)
  deletereview(@Param("id") id: string) {
    return this.service.deletereview(id)
  }

  @Patch("/:id")
  @HttpCode(200)
  updatereview(@Param("id") id: string, @Body() data: any) {
    return this.service.updatereview(id,data)
  }
}
