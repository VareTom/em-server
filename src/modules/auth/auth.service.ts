import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// Services
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from 'src/core/entities/user.entity';
import { Entity } from 'src/core/entities/entity.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';
import { UserCreateOutputDto } from 'src/core/dtos/user/userCreateOutputDto';
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY)
              private userRepository: typeof User,
              private readonly jwt: JwtService) {}
  
  async validateUser(uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findByPk(uuid);
    if (!user) {
      throw new UnauthorizedException();
    }
    return new UserOutputDto(user);
  }
  
  async login(userCreateInput: UserCreateInputDto): Promise<UserCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: userCreateInput.email
      },
      include: [ Entity ]
    });
    console.log(user)

    if (!user) throw new HttpException('No user found with this email', HttpStatus.NOT_FOUND);

    const isValid = await bcrypt.compare(userCreateInput.password, user.password);
    if (!isValid) throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);

    const formattedUser = new UserOutputDto(user);
    const jwt = this.jwt.sign({user: formattedUser});
    if (!jwt) throw new HttpException('Token creation failed', HttpStatus.INTERNAL_SERVER_ERROR);

    return {
      token: jwt,
      user: formattedUser
    };
  }
  
  async register(userCreateInput: UserCreateInputDto): Promise<UserCreateOutputDto> {
    const isEmailExists = await this.userRepository.findOne({
      where: {
        email: userCreateInput.email.toLowerCase()
      }
    })
    if (isEmailExists) throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);

    userCreateInput.password = await bcrypt.hash(userCreateInput.password, 10);
    const userCreated = await this.userRepository.create(userCreateInput).then(user => user.toJSON());
    
    const jwt = this.jwt.sign({user: userCreated});
    if (!jwt) throw new HttpException('Token creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return {token: jwt, user: new UserOutputDto(userCreated)};
  }
  
  async isValidCode(code: number): Promise<boolean> {
    return this.userRepository.findOne({
      where: {registrationCode: code}
    })
      .then(user => {
        return !!user;
      })
      .catch(err => {
        throw new HttpException('Cannot retrieve user with this code', HttpStatus.BAD_REQUEST);
      })
  }
}
