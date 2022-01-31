import { Injectable } from '@nestjs/common';
import { Entity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EntityService {
  
  constructor(private prisma: PrismaService) {}
  
  async create(entity: any): Promise<Entity> {
    const createdEntity = this.prisma.user.create({
      data: entity
    })
    
    return entity;
  }
}
