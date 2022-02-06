import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { Entity } from 'src/core/entities/entity.entity';

// Constants
import { ENTITY_REPOSITORY } from 'src/core/constants';
import { UserEntity } from 'src/core/entities/user-entity.entity';
import { Service } from 'src/core/entities/service.entity';
import { Order } from 'src/core/entities/order.entity';
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { User } from 'src/core/entities/user.entity';


@Injectable()
export class EntityService {
  
  constructor(
    @Inject(ENTITY_REPOSITORY)
    private entityRepository: typeof Entity
  ) {}
  
  /*async create(entity: any): Promise<Entity> {
    const createdEntity = this.prisma.user.create({
      data: entity
    })
    
    return entity;
  }*/
  
  async getAllForUser(id: string): Promise<any | []> {
    return this.entityRepository.findAll({
      include: [User, Service, Order, Expenditure]
    })
      .then(entities => {
        console.log(entities);
      })
      .catch(err => {
        console.log(err);
        throw new HttpException('Cannot retrieve user entities!',HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
