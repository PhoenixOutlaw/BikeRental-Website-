import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entity/reservation.entity';
import { ReservationController } from './controller/reservation.controller';
import { ReservationService } from './services/reservation.service';

@Module({
  imports:[TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}
