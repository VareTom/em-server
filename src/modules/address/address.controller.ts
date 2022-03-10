import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AddressService } from 'src/modules/address/address.service';

// Guards
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { AddressCreateInputDto } from 'src/core/dtos/address/addressCreateInputDto';
import { AddressOutputDto } from 'src/core/dtos/address/addressOutputDto';

// DTOs


@ApiTags('addresses')
@Controller('addresses')
@UseInterceptors(ClassSerializerInterceptor)
export class AddressController {
  
  constructor(private readonly addressService: AddressService) {
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Create an address and return client object'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @Post(':clientUuid')
  async create(
      @Param('clientUuid') clientUuid: string,
      @Body() address: AddressCreateInputDto): Promise<ClientOutputDto> {
    return await this.addressService.create(clientUuid, address);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Update an address and return client object'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: ClientOutputDto
  })
  @Put(':addressUuid')
  async update(
      @Param('addressUuid') addressUuid: string,
      @Body() addressInput: AddressCreateInputDto): Promise<ClientOutputDto> {
    return await this.addressService.update(addressUuid, addressInput);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Delete an address and return the object of deleted address'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: AddressOutputDto
  })
  @Delete(':addressUuid')
  async delete(@Param('addressUuid') addressUuid: string): Promise<AddressOutputDto> {
    return await this.addressService.delete(addressUuid);
  }
}
