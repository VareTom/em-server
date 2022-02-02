import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { EntityService } from 'src/modules/entity/entity.service';

@ApiTags('entities')
@Controller('api/entities')
export class EntityController {
  
  constructor(private readonly entityService: EntityService) {
  }
  
  @Post()
  async create(@Body() entity: any): Promise<any> {
   // return await this.entityService.create(entity);
  }
}
