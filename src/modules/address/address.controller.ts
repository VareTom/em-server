import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AddressService } from 'src/modules/address/address.service';

// Guards
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs


@ApiTags('addresses')
@Controller('addresses')
export class AddressController {
  
  constructor(private readonly addressService: AddressService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() address: any): Promise<any> {
    return await this.addressService.create(address);
  }
}
