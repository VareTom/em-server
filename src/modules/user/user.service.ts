import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { User } from 'src/core/entities/user.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { UserUpdateInputDto } from 'src/core/dtos/user/userUpdateInputDto';
import { Entity } from 'src/core/entities/entity.entity';
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';

// Services
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}

  async getOne(uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid,
        isDisabled: false,
        isConfirmed: true,
      },
      include: [ Entity ]
    });
    
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return new UserOutputDto(user);
  }
  
  async update(userInput: UserUpdateInputDto,uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findByPk(uuid);
    if (!user) throw new HttpException('No user with this identifier', HttpStatus.BAD_REQUEST);
    
    return this.userRepository.update(userInput,{
      where: { uuid: user.uuid }
    })
      .then(async () => {
        const updatedUser = await this.userRepository.findByPk(user.uuid);
        return new UserOutputDto(updatedUser);
    })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') throw new HttpException(`Email already registered`, HttpStatus.BAD_REQUEST);
        throw new HttpException(`User not updated`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async getAll(): Promise<UserOutputDto[]> {
    return this.userRepository.findAll({
          include: [ Entity ]
        })
        .then(users => {
          return users.map(user => new UserOutputDto(user));
        })
        .catch(err => {
          console.log(err);
          throw new HttpException('Cannot retrieve all users.', HttpStatus.INTERNAL_SERVER_ERROR);
        })
  }
  
  async disabled (uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findByPk(uuid);
    if (!user) throw new HttpException('Cannot find this user', HttpStatus.BAD_REQUEST);
    
    user.isDisabled = !user.isDisabled;
    await user.save();
    
    return new UserOutputDto(user);
  }
  
  async invite (userCreateInput: UserCreateInputDto): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: {email: userCreateInput.email}
    });
    if (user) throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
    
    const createdUser = await this.userRepository.create(userCreateInput)
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') throw new HttpException(`Email already registered`, HttpStatus.BAD_REQUEST);
        throw new HttpException(`User not created`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
    if (!createdUser) throw new HttpException('Cannot create user', HttpStatus.BAD_REQUEST);
    
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
  
      return new UserOutputDto(user);
    } catch (e) {
      console.log(e);
      throw new HttpException('Cannot send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
