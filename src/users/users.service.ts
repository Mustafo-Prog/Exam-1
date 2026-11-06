import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Register } from './dto/register.dto.js';
import * as bcrypt from "bcrypt"

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