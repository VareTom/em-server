import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { EntityService } from 'src/modules/entity/entity.service';

// Guards
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { EntityCreateInputDto } from 'src/core/dtos/entity/entityCreateInputDto';
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';

@ApiTags('entities')
@Controller('entities')
@UseInterceptors(ClassSerializerInterceptor)
export class EntityController {
  
  constructor(private readonly entityService: EntityService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: EntityCreateOutputDto
  })
  @Post()
  async create(@Body() entity: EntityCreateInputDto): Promise<EntityCreateOutputDto> {
   return await this.entityService.create(entity);
  }
  
  // TODO:: get list members
  // TODO:: refacto to send mail invitation + invitation code
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: EntityCreateOutputDto
  })
  @Post(':entityUuid/user/:userUuid')
  async addEntityMember(@Param('entityUuid') entityUuid: string,
                        @Param('userUuid') userUuid: string): Promise<EntityCreateOutputDto> {
    return await this.entityService.addEntityMember(entityUuid, userUuid);
  }
}
