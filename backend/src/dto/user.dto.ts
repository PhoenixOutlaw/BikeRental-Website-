import { PartialType } from "@nestjs/mapped-types";
import { Exclude } from "class-transformer";
import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";


export class Create_UserDto  {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail({},{message: 'email invalid'})
    email: string;

    @IsOptional()
    @Matches(/(admin)|(regular)/,{message: 'role can me admin or regular only'}) 
    role: string;
    
    @IsString()
    @MinLength(6,{message: 'min length 6ch'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak include(A-Z,a-z,1-9,(*, $, etc)'})
    password: string;
}

export class Signin_userdto{
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password invalid'})
    password: string;

}

export class Serialized_user {
     reservations:any[];
    @Exclude()
    password: string;
    constructor(partial: Partial<Create_UserDto>) {
        Object.assign(this, partial);
      }
}