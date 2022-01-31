import { Body, Controller, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

// Swagger
import { ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/auth/auth.service';
import { UserSessionDto } from 'src/auth/userSessionDto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {
  }
  
  @Post('register')
  async register(@Body() user: Prisma.UserCreateInput): Promise<UserSessionDto> {
    return await this.authService.register(user);
  }
  
  @Post('login')
  async login(@Body() user: Prisma.UserCreateInput): Promise<UserSessionDto> {
    return await this.authService.login(user);
  }
}
