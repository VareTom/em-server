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
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { EntityCreateInputDto } from 'src/core/dtos/entity/entityCreateInputDto';
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';

@ApiTags('entities')
@Controller('entities')
export class EntityController {
  
  constructor(private readonly entityService: EntityService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: EntityCreateOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() entity: EntityCreateInputDto): Promise<EntityCreateOutputDto> {
   return await this.entityService.create(entity);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: EntityCreateOutputDto,
    isArray: true
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userUuid')
  async getAllForUser(@Param('userUuid') userUuid: string): Promise<EntityCreateOutputDto[]> {
    return await this.entityService.getAllForUser(userUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: EntityCreateOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':entityUuid/user/:userUuid')
  async addEntityMember(@Param('entityUuid') entityUuid: string,
                        @Param('userUuid') userUuid: string): Promise<EntityCreateOutputDto> {
    return await this.entityService.addEntityMember(entityUuid, userUuid);
  }
}
