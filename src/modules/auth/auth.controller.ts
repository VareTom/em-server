import { Body, ClassSerializerInterceptor, Controller, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';

// Swagger
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// DTOs
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';
import { UserCreateOutputDto } from 'src/core/dtos/user/userCreateOutputDto';
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { UserRegisterInputDto } from 'src/core/dtos/user/userRegisterInputDto';
import { UserLoginInputDto } from 'src/core/dtos/user/userLoginInputDto';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  
  constructor(private readonly authService: AuthService) {
  }
  
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: UserCreateOutputDto
  })
  @Post('register')
  async register(@Body() user: UserRegisterInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.register(user);
  }
  
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserCreateOutputDto
  })
  @Post('login')
  async login(@Body() user: UserLoginInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.login(user);
  }
  
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: Boolean
  })
  @Post('valid/code')
  async isValidCode(@Body() codeInput: any): Promise<boolean> {
    return await this.authService.isValidCode(codeInput.code);
  }
}
