import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Entity, Prisma } from '@prisma/client';

// Services
import { EntityService } from 'src/entity/entity.service';

@ApiTags('entities')
@Controller('api/entities')
export class EntityController {
  
  constructor(private readonly entityService: EntityService) {
  }
  
  @Post()
  async create(@Body() entity: Entity): Promise<Entity> {
    return await this.entityService.create(entity);
  }
}
