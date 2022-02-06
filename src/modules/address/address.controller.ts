import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  @Post()
  async create(@Body() address: any): Promise<any> {
    return await this.addressService.create(address);
  }
}
