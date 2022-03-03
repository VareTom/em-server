import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

// Entities
import { Entity } from 'src/core/entities/entity.entity';
import { User } from 'src/core/entities/user.entity';

// Constants
import { ENTITY_REPOSITORY, USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { EntityCreateInputDto } from 'src/core/dtos/entity/entityCreateInputDto';
import { EntityCreateOutputDto } from 'src/core/dtos/entity/entityCreateOutputDto';
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';


@Injectable()
export class EntityService {
  
  constructor(
    @Inject(ENTITY_REPOSITORY)
    private entityRepository: typeof Entity,
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}
  
  async create(entity: EntityCreateInputDto): Promise<EntityCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: entity.authorUuid,
        entityUuid: { [Op.is]: null }
      }
    })
    if (!user) throw new HttpException('Cannot retrieve author!', HttpStatus.BAD_REQUEST);

    const createdEntity = await this.entityRepository.create(entity);
    if (!createdEntity) throw new HttpException('Cannot create entity', HttpStatus.BAD_REQUEST);
    
    await user.$set('entity',createdEntity);
    
    return new EntityCreateOutputDto(createdEntity);
  }
  
  async getMembers(entityUuid: string): Promise<UserOutputDto[]> {
    return this.userRepository.findAll({
      where: { entityUuid: entityUuid }
    })
      .then(members => {
      return members.map(member => new UserOutputDto(member));
    })
      .catch(err => {
        throw new HttpException('Cannot retrieve members for this entity', HttpStatus.INTERNAL_SERVER_ERROR);
      })
  }
  
  async addEntityMember(entityUuid: string, userUuid: string): Promise<EntityCreateOutputDto> {
    return new EntityCreateOutputDto(null);
    /*const isAlreadyMember = await this.entityRepository.findOne({
      where: { uuid: entityUuid },
      include: [ {
        model: UserEntity,
        where: { userUuid: userUuid }
      } ]
    })
    if (isAlreadyMember) throw new HttpException('This user is already a member of the entity.', HttpStatus.BAD_REQUEST);
    
    const newEntityMember = await this.userEntityRepository.create({
      userUuid: userUuid,
      entityUuid: entityUuid,
      isAdmin: false
    })
    if (!newEntityMember) throw new HttpException('Cannot link this user to the entity.', HttpStatus.INTERNAL_SERVER_ERROR);
    
    const entityWithMembers = await this.entityRepository.findOne({
      where: { uuid: entityUuid },
      include: [{
        model: UserEntity,
        include: [User]
      }]
    }).then(entity => entity.toJSON())
    if (!entityWithMembers) throw new HttpException('Cannot retrieve entity informations!', HttpStatus.INTERNAL_SERVER_ERROR);
    
    let returnedObject = {
      uuid: entityWithMembers.uuid,
      name: entityWithMembers.name,
      description: entityWithMembers.description,
      authorUuid: entityWithMembers.authorUuid,
      createdAt: entityWithMembers.createdAt,
      members: []
    }
    
    if (entityWithMembers.userEntities.length > 0) {
      entityWithMembers.userEntities.forEach(member => {
        returnedObject.members.push({
          ...member.user,
          isAdmin: member.isAdmin,
          addAt: member.createdAt
        })
      })
    }
    return new EntityCreateOutputDto(returnedObject);*/
  }
}
