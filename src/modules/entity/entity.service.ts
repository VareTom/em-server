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
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';

// Services
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EntityService {
  
  constructor(
    private readonly mailerService: MailerService,
    @Inject(ENTITY_REPOSITORY)
    private entityRepository: typeof Entity,
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}
  
  async create(entity: EntityCreateInputDto): Promise<EntityCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: entity.authorUuid,
        isDisabled: false,
        isConfirmed: true,
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
  
  async inviteMember(entityUuid: string, userCreateInput: UserCreateInputDto): Promise<UserOutputDto> {
    const entity = await this.entityRepository.findByPk(entityUuid);
    if (!entity) throw new HttpException('Cannot find this entity', HttpStatus.BAD_REQUEST);
  
    const user = await this.userRepository.findOne({
      where: {email: userCreateInput.email}
    });
    if (user) throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
  
    const createdUser = await this.userRepository
      .create(userCreateInput)
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') throw new HttpException(`Email already registered`, HttpStatus.BAD_REQUEST);
        throw new HttpException(`User not created`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    if (!createdUser) throw new HttpException('Cannot create user', HttpStatus.BAD_REQUEST);
    
    await createdUser.$set('entity', entity);
    
    const registrationCode = Math.floor(100000 + Math.random() * 900000);
    createdUser.registrationCode = registrationCode;
    
    await createdUser.save();
  
    try {
      let url;
      if (process.env.NODE_ENV === 'development') {
        url = `http://localhost:4200/auth/register?code=${registrationCode}&email=${createdUser.email}`;
      } else {
        url = `https://em.varetom.be/auth/register?code=${registrationCode}&email=${createdUser.email}`
      }
      const data = {
        registrationCode,
        url: url
      }
      
      await this.mailerService.sendMail({
        to: createdUser.email,
        from: process.env.MAIL_NO_REPLY,
        subject: 'Invitation à rejoindre `Em',
        template: 'invitation',
        context: {
          ...data
        }
      })
    } catch (e) {
      console.log(e);
      throw new HttpException('Cannot send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return new UserOutputDto(user);
  }
  
  async removeMember(entityUuid: string, userUuid: string): Promise<UserOutputDto> {
    return this.userRepository.findOne({
      where: {
        uuid: userUuid,
        entityUuid: entityUuid
      }
    })
      .then(async user => {
        if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        
        await user.destroy();
        return new UserOutputDto(user);
      })
  }
}
