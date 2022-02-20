import { AddressCreateInputDto } from 'src/core/dtos/address/addressCreateInputDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClientCreateInputDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @ApiProperty()
  @IsOptional()
  lastName?: string;
}
