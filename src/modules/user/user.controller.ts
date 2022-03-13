import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param, Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { UserService } from 'src/modules/user/user.service';

// Guards
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { UserUpdateInputDto } from 'src/core/dtos/user/userUpdateInputDto';
import { SuperAdminGuard } from 'src/core/guards/super-admin.guard';
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';


@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private readonly userService: UserService) {
  }
  
  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto,
    isArray: true
  })
  @Get('/all')
  async getAll(): Promise<UserOutputDto[]> {
    return await this.userService.getAll();
  }
  
  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @Get(':uuid/disabled')
  async disabled(@Param('uuid') uuid: string): Promise<UserOutputDto> {
    return await this.userService.disabled(uuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<UserOutputDto> {
    return await this.userService.getOne(uuid);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @Put(':uuid')
  async update(@Param('uuid') uuid: string,
               @Body() user: UserUpdateInputDto): Promise<UserOutputDto> {
    return await this.userService.update(user,uuid);
  }
  
  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: UserOutputDto
  })
  @Post('/invite')
  async addEntityMember(@Body() userInput: UserCreateInputDto): Promise<UserOutputDto> {
    return await this.userService.invite(userInput);
  }
}
