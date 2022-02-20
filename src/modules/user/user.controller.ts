import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { UserService } from 'src/modules/user/user.service';

// Guards
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { UserUpdateInputDto } from 'src/core/dtos/user/userUpdateInputDto';


@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto
  })
  @UseInterceptors(ClassSerializerInterceptor)
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':uuid')
  async update(@Param('uuid') uuid: string,
               @Body() user: UserUpdateInputDto): Promise<UserOutputDto> {
    return await this.userService.update(user,uuid);
  }
}