import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Register } from './dto/register.dto.js';

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
        await this.prisma.user.create({
            data: body
        })
        return{
            message: "+Product"
        }
    }
    async update(id: number, body: any) {
        await this.prisma.user.update({where: {id}, data: body})
        return {
            message: "Updated"
        }
    }
    async delete(id: number){
        await this.prisma.user.delete({
            where: {id}
        })
        return {
            message: "Deleted"
        }
    }
}