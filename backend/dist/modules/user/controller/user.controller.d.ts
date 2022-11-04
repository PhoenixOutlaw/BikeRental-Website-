/// <reference types="multer" />
import { UserService } from "../services/user.service";
export declare class UserController {
    private readonly services;
    constructor(services: UserService);
    getallusers(params: any): Promise<{
        total: number;
        users: import("../../../dto/user.dto").Serialized_user[];
    }>;
    getuser(id: string, data: any): Promise<import("../../../dto/user.dto").Serialized_user>;
    deleteuser(id: string): Promise<string>;
    modifyuser(id: string, req: any, file: Express.Multer.File): Promise<string>;
}
