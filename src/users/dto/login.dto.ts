import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class Login {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(25)
    password: string;
}