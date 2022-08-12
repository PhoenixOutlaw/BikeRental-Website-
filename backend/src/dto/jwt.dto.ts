import { IsString } from "class-validator";

export class jwtDto {
  @IsString()
  id: string;

  @IsString()
  role: string;
}
