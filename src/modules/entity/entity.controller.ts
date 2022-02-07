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
  @Get(':uuid/entities')
  async getAllForUser(@Param('uuid') uuid: string): Promise<any> {
    return await this.entityService.getAllForUser(uuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':entityUuid/user/:userUuid')
  async addEntityMember(@Param('entityUuid') entityUuid: string,
                        @Param('userUuid') userUuid: string): Promise<any> {
    return await this.entityService.addEntityMember(entityUuid, userUuid);
  }
}
