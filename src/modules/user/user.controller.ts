import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';

// Services
import { UserService } from 'src/modules/user/user.service';

// Guards
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { User } from 'src/core/entities/user.entity';


@ApiTags('users')
@Controller('api/users')
export class UserController {

  constructor(private readonly userService: UserService) {
  }
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.getOne(id);
  }
  
  /*@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getAll(): Promise<User[] | []> {
    return await this.userService.getAll();
  }*/
  
  /*@UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(@Param('id') id: string,
               @Body() user: Prisma.UserUpdateInput): Promise<User> {
    return await this.userService.update(user,id);
  }*/
  
 /* @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }*/
}
