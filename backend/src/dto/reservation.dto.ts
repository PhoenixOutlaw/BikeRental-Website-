import { IsNotEmpty, IsString } from "class-validator";

export class Create_reservationdto{
    @IsNotEmpty()
    duration: number;
}