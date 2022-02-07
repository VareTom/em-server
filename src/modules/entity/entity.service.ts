import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { Entity } from 'src/core/entities/entity.entity';
import { Service } from 'src/core/entities/service.entity';
import { Order } from 'src/core/entities/order.entity';
import { Expenditure } from 'src/core/entities/expenditure.entity';
import { User } from 'src/core/entities/user.entity';
import { UserEntity } from 'src/core/entities/user-entity.entity';

// Constants
import { ENTITY_REPOSITORY, USER_ENTITY_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';

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
    @Inject(USER_ENTITY_REPOSITORY)
    private userEntityRepository: typeof UserEntity,
  ) {}
  
  async create(entity: EntityCreateInputDto): Promise<EntityCreateOutputDto> {
    const userEntites = await this.entityRepository.findOne({
      where: {
        name: entity.name
      },
      include: [
        {
          model: UserEntity,
          include: [
            {
              model: User,
              where: {
                uuid: entity.authorUuid
              }
            }
          ]
        }
      ]
    })
    console.log(userEntites)
    if (userEntites) throw new HttpException('You are already part of an entity of that name!', HttpStatus.BAD_REQUEST);

    const createdEntity = await this.entityRepository.create(entity)
    if (!createdEntity) throw new HttpException('Cannot create entity', HttpStatus.BAD_REQUEST);

    const createdRelation = await this.userEntityRepository.create({
      userUuid: createdEntity.authorUuid,
      entityUuid: createdEntity.uuid,
      isAdmin: true
    })
    if (!createdRelation) throw new HttpException('Cannot create the relation between you and your new entity.', HttpStatus.INTERNAL_SERVER_ERROR);

    return {
      uuid: createdEntity.uuid,
      name: createdEntity.name,
      description: createdEntity.description ?? null,
      authorUuid: createdEntity.authorUuid,
      createdAt: createdEntity.createdAt,
      isAdmin: createdRelation.isAdmin
    };
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
