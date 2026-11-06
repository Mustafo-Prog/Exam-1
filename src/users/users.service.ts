import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Register } from './dto/register.dto.js';
import * as bcrypt from "bcrypt"
import { Login } from './dto/login.dto.js';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    async getAll(){
        return this.prisma.user.findMany({
            orderBy: {id: "asc"}
        })
    }
    async getOne(id: number){
        return this.prisma.user.findUnique({
            where: {id}
        })
    }
    async register(body: Register){
        const {nickname, email, age, password} = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.prisma.user.create({
            data: {nickname, email, age, password: hashedPassword}
        })
        return{
            message: "+Product"
        }
    }
    async login(body: Login){
        const {email, password} = body
        const user = await this.prisma.user.findUnique({where: {email}})
        const result = await bcrypt.compare(password, user!.password)
        if (!user || !result){
            throw new UnauthorizedException("Email or Password incorrect");
        }
        return{
            message: "Successfully logged in!",
            info: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                age: user.age || "Hidden"
            }
        }
    }
    // async update(id: number, body: any) {
    //     const {nickname, email, age, password} = body;
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     await this.prisma.user.update({where: {id}, data: {nickname, email, age, password: hashedPassword}})
    //     return {
    //         message: "Updated"
    //     }
    // }
    async delete(id: number){
        await this.prisma.user.delete({
            where: {id}
        })
        return {
            message: "Deleted"
        }
    }
}