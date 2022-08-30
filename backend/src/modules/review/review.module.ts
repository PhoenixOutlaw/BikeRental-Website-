import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { Review } from 'src/entity/review.entity';
import { ReviewController } from './controller/review.controller';
import { ReviewService } from './services/review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review,Reservation])],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
