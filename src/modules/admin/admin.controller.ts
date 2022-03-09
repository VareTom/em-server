import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Service
import { AdminService } from 'src/modules/admin/admin.service';

// Guards
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { SuperAdminGuard } from 'src/core/guards/super-admin.guard';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';

@ApiTags('admin')
@Controller('admin')
@UseInterceptors(ClassSerializerInterceptor)
export class AdminController {
  constructor(
      private readonly adminService: AdminService) {
  }

  @UseGuards(JwtAuthGuard, SuperAdminGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserOutputDto,
    isArray: true
  })
  @Get()
  async getAllUsers(): Promise<UserOutputDto[]> {
    return await this.adminService.getAllUsers();
  }
}
