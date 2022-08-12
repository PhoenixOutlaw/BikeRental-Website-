import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeormconfig } from "./database/databaseconfig";
import { AuthModule } from "./modules/auth/auth.module";
import { BikesModule } from "./modules/bikes/bikes.module";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { ReviewModule } from "./modules/review/review.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    BikesModule,
    ReviewModule,
    ReservationModule,
    TypeOrmModule.forRoot(typeormconfig),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
