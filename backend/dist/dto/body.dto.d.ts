import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { jwtDto } from "./jwt.dto";
export declare type Bodydto = {
    data: Create_Bikedto | Update_Bikedto;
    jwt: jwtDto;
};
