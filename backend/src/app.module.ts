import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/databaseconfig.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BikesModule } from "./modules/bikes/bikes.module";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { ReviewModule } from "./modules/review/review.module";
import { UserModule } from "./modules/user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    BikesModule,
    ReviewModule,
    ReservationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
    }),
  ],
  controllers:[
    AppController,
  ]
})
export class AppModule {}
