import { User } from "src/database";
import { Serialized_user } from "src/dto/user.dto";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly userrepo;
    constructor(userrepo: Repository<User>);
    getallusers(params: any): Promise<{
        total: number;
        users: Serialized_user[];
    }>;
    getuser(id: string, data: any): Promise<Serialized_user>;
    deleteuser(id: string): Promise<string>;
    updateuser(id: string, data: any): Promise<string>;
}
