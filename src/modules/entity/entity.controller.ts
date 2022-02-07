import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// Services
import { EntityService } from 'src/modules/entity/entity.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { EntityCreateInputDto } from 'src/core/dtos/entity/entityCreateInputDto';

@ApiTags('entities')
@Controller('entities')
export class EntityController {
  
  constructor(private readonly entityService: EntityService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Body() entity: EntityCreateInputDto): Promise<any> {
   return await this.entityService.create(entity);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id/entities')
  async getAllForUser(@Param('id') id: string): Promise<any> {
    return await this.entityService.getAllForUser(id);
  }
}
