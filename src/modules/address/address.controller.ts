import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AddressService } from 'src/modules/address/address.service';

// Guards
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

// DTOs


@ApiTags('addresses')
@Controller('addresses')
@UseInterceptors(ClassSerializerInterceptor)
export class AddressController {
  
  constructor(private readonly addressService: AddressService) {
  }
}
