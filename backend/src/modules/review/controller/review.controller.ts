import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ReviewService } from '../services/review.service';

@Controller('review')
@UseGuards(AuthGuard)
export class ReviewController {
    constructor(private readonly service : ReviewService){}
     
  @Post("/:id")
  createreview(@Body() data: any, @Param("id") id: string) {
    return this.service.createreview(id,data)
  }

  @Delete("/:id")
  deletereview(@Param("id") id: string) {
    return this.service.deletereview(id)
  }

  @Patch("/:id")
  updatereview(@Param("id") id: string, @Body() data: any) {
    return this.service.updatereview(id,data)
  }
}
