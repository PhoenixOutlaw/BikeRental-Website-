import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from 'src/entity/bike.entity';
import { Reservation } from 'src/entity/reservation.entity';
import { BikesController } from './controller/bikes.controller';
import { BikesService } from './services/bikes.service';

@Module({
    imports:[TypeOrmModule.forFeature([Bike,Reservation])],
  providers: [BikesService],
  controllers: [BikesController]
})
export class BikesModule {}
