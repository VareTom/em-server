import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { SERVICE_REPOSITORY } from 'src/core/constants';

// Entities
import { Service } from 'src/core/entities/service.entity';

// DTOs
import { ServiceOutputDto } from 'src/core/dtos/service/serviceOutputDto';
import { ServiceCreateInputDto } from 'src/core/dtos/service/serviceCreateInputDto';


@Injectable()
export class ServiceService {
  constructor(@Inject(SERVICE_REPOSITORY)
  private serviceRepository: typeof Service
  ) {}
  
  async create(serviceInput: ServiceCreateInputDto): Promise<ServiceOutputDto> {
    const serviceWithSameName = await this.serviceRepository
      .findOne({ where: {name: serviceInput.name }})
    if (serviceWithSameName) throw new HttpException('You already have a service with this name in your entity', HttpStatus.BAD_REQUEST);
    
    const service = await this.serviceRepository.create(serviceInput);
    if (!service) throw new HttpException('Cannot create service.', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return new ServiceOutputDto(service);
  }
  
  async getAllForEntity(entityUuid: string): Promise<ServiceOutputDto[]> {
    const services = await this.serviceRepository.findAll({
      where: { entityUuid: entityUuid }
    })
    if (services.length < 0) throw new HttpException('Cannot retrieve all services for this entity', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return services.map(service => new ServiceOutputDto(service));
  }
  
}
