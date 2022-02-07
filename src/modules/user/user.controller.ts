import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

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
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserOutputDto> {
    return await this.userService.getOne(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({
    type: UserUpdateInputDto
  })
  @Put(':id')
  async update(@Param('id') id: string,
               @Body() user: UserUpdateInputDto): Promise<UserOutputDto> {
    return await this.userService.update(user,id);
  }
}
