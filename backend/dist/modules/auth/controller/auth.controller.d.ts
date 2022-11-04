import { Create_UserDto, Signin_userdto } from "src/dto/user.dto";
import { AuthService } from "../services/Auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(data: Signin_userdto): any;
    register(data: Create_UserDto): any;
    getloggeduser(jwt: any): any;
}
