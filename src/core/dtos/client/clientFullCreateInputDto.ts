import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

// DTOs
import { ClientCreateInputDto } from 'src/core/dtos/client/clientCreateInputDto';
import { CarCreateInputDto } from 'src/core/dtos/car/carCreateInputDto';
import { AddressCreateInputDto } from 'src/core/dtos/address/addressCreateInputDto';

export class ClientFullCreateInputDto {
  
  @ApiProperty()
  @IsNotEmpty()
  client: ClientCreateInputDto;
  
  @ApiProperty()
  @IsOptional()
  address?: AddressCreateInputDto;
  
  @ApiProperty()
  @IsOptional()
  car?: CarCreateInputDto;
}