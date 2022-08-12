import { Module } from "@nestjs/common";
import { AuthService } from "./services/Auth.service";
import { AuthController } from "./controller/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
