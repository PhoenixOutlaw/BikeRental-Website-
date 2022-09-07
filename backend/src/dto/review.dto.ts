import { IsNotEmpty } from "class-validator";

export class Create_reviewdto {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  review: string;
}

export class Update_reviewdto {
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  review: string;
}
