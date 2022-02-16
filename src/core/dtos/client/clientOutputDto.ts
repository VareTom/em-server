import { AddressOutputDto } from 'src/core/dtos/address/addressOutputDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CarOutputDto } from 'src/core/dtos/car/carOutputDto';

export class ClientOutputDto {
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @ApiProperty()
  @IsOptional()
  lastName?: string;
  
  @ApiProperty()
  @IsOptional()
  options?: string;
  
  @ApiProperty()
  @IsOptional()
  address?: AddressOutputDto;
  
  @ApiProperty({
    type: ClientOutputDto,
    isArray: true
  })
  @IsOptional()
  cars: CarOutputDto[];
  
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.options = json.options;
    if (json.address) this.address = new AddressOutputDto(json.address);
    this.cars = json.cars.map(car => new CarOutputDto(car));
    this.createdAt = json.createdAt;
  }
}