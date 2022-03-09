import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
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
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

// DTOs
import { EntityCreateInputDto } from 'src/core/dtos/entity/entityCreateInputDto';
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';

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
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    type: UserOutputDto,
    isArray: true
  })
  @Get(':entityUuid/members')
  async getMembers(@Param('entityUuid') entityUuid: string): Promise<UserOutputDto[]> {
    return await this.entityService.getMembers(entityUuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: UserOutputDto
  })
  @Post(':entityUuid/invite')
  async addEntityMember(@Param('entityUuid') entityUuid: string,
                        @Body() userInput: UserCreateInputDto): Promise<UserOutputDto> {
    return await this.entityService.inviteMember(entityUuid, userInput);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @Delete(':entityUuid/user/:userUuid')
  async removeMember(@Param('entityUuid') entityUuid: string,
               @Param('userUuid') userUuid: string,): Promise<UserOutputDto> {
    return await this.entityService.removeMember(entityUuid, userUuid);
  }
}
