import { ServiceOutputDto } from 'src/core/dtos/service/serviceOutputDto';
import { ClientOutputDto } from 'src/core/dtos/client/clientOutputDto';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDate, IsInstance, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class OrderOutputDto {
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  uuid: string;
  
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  entityUuid: string;
  
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  durationInMinute?: number;
  
  @ApiProperty()
  @IsNumber()
  totalInCent: number;
  
  @ApiProperty()
  @IsDate()
  @IsOptional()
  performedAt?: Date;
  
  @ApiProperty()
  @IsDate()
  @IsOptional()
  validatedAt?: Date;
  
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
  
  @ApiProperty({
    type: ServiceOutputDto
  })
  @IsArray()
  @ArrayMinSize(1)
  services: ServiceOutputDto[];
  
  @ApiProperty()
  @IsInstance(ClientOutputDto)
  @IsNotEmpty()
  client: ClientOutputDto;
  
  constructor(json: any) {
    this.uuid = json.uuid;
    this.entityUuid = json.entityUuid;
    this.durationInMinute = json.durationInMinute;
    this.totalInCent = json.totalInCent;
    this.performedAt = json.performedAt;
    this.validatedAt = json.validatedAt;
    this.createdAt = json.createdAt;
    
    this.services = json.services.map(service => new ServiceOutputDto(service)); // TODO:: list of service ?
    this.client = new ClientOutputDto(json.client);
  }
}