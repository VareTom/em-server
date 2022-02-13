import { ClientCreateInputDto } from 'src/core/dtos/client/clientCreateInputDto';
import { AddressCreateInputDto } from 'src/core/dtos/address/addressCreateInputDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientAddressCreateInputDto {
  
  @ApiProperty()
  @IsNotEmpty()
  client: ClientCreateInputDto;
  
  @ApiProperty()
  @IsOptional()
  address: AddressCreateInputDto;
}