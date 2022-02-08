import { Body, ClassSerializerInterceptor, Controller, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';

// Swagger
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// DTOs
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';
import { UserCreateOutputDto } from 'src/core/dtos/user/userCreateOutputDto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {
  }
  
  //@UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() user: UserCreateInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.register(user);
  }
  
  @Post('login')
  async login(@Body() user: UserCreateInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.login(user);
  }
}
