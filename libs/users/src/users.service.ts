import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService implements OnModuleDestroy {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    console.log("Users");
    
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: Partial<User>): Promise<User> {
    return prisma.user.create({ data: data as any });
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
