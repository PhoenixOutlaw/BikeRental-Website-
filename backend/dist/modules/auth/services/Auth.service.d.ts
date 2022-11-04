import { User } from "src/database";
import { Create_UserDto, Serialized_user, Signin_userdto } from "src/dto/user.dto";
import { Repository } from "typeorm";
export declare class AuthService {
    private user;
    constructor(user: Repository<User>);
    register(data: Create_UserDto): Promise<{
        jwttoken: any;
        user: Serialized_user;
    }>;
    signin(data: Signin_userdto): Promise<{
        jwttoken: any;
        user: Serialized_user;
    }>;
    getloggeduser(token: string): Promise<Serialized_user>;
}
