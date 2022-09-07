import { IsNotEmpty } from "class-validator";

export class Create_reservationdto{
    @IsNotEmpty()
    from: Date;
    
    @IsNotEmpty()
    to: Date;
}

export class Update_reservationdto{
    @IsNotEmpty()
    active: boolean;
}