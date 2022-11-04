export declare class Create_UserDto {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
}
export declare class Signin_userdto {
    email: string;
    password: string;
}
export declare class Serialized_user {
    reservations: any[];
    password: string;
    constructor(partial: Partial<Create_UserDto>);
}
