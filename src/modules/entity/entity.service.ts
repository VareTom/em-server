import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { Entity } from 'src/core/entities/entity.entity';
import { Service } from 'src/core/entities/service.entity';
import { Order } from 'src/core/entities/order.entity';
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { User } from 'src/core/entities/user.entity';

// Constants
import { ENTITY_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { EntityCreateInputDto } from 'src/core/dtos/entity/entityCreateInputDto';
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';


@Injectable()
export class EntityService {
  
  constructor(
    @Inject(ENTITY_REPOSITORY)
    private entityRepository: typeof Entity,
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User,
  ) {}
  
  async create(entity: EntityCreateInputDto): Promise<EntityCreateOutputDto> {
    return await this.entityRepository.create(entity)
      .then(createdEntity => {
        console.log(createdEntity);
        const returnedEntity: EntityCreateOutputDto = {
          ...createdEntity
        }
        return returnedEntity;
      })
      .catch(err => {
        console.log(err);
        throw new HttpException('Cannot create entity', HttpStatus.BAD_REQUEST);
      })
  }
  
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
