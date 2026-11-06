import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class Register{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
    nickname: string;
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNumber()
    @Min(0)
    @IsOptional()
    age: number;
    @IsString()
    @MinLength(8)
    @MaxLength(25)
    @IsNotEmpty()
    password: string
}