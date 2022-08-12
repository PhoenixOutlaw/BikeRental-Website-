import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/entity/review.entity';
import { ReviewController } from './controller/review.controller';
import { ReviewService } from './services/review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
