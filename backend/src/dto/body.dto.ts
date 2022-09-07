import { Create_Bikedto, Update_Bikedto } from "src/dto/bike.dto";
import { jwtDto } from "./jwt.dto"
import { Create_UserDto, Signin_userdto } from "./user.dto"

export type Bodydto ={
    data: Create_Bikedto| Update_Bikedto,
    jwt:jwtDto

}