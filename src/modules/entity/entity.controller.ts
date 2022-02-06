import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// Services
import { EntityService } from 'src/modules/entity/entity.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiTags('entities')
@Controller('entities')
export class EntityController {
  
  constructor(private readonly entityService: EntityService) {
  }
  
  @Post()
  async create(@Body() entity: any): Promise<any> {
   // return await this.entityService.create(entity);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id/entities')
  async getAllForUser(@Param('id') id: string): Promise<any> {
    return await this.entityService.getAllForUser(id);
  }
}
