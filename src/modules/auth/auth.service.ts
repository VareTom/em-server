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
import { UserRegisterInputDto } from 'src/core/dtos/user/userRegisterInputDto';
import { UserLoginInputDto } from 'src/core/dtos/user/userLoginInputDto';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY)
              private userRepository: typeof User,
              private readonly jwt: JwtService) {}
  
  async validateUser(uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid,
        isDisabled: false,
        isConfirmed: true
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return new UserOutputDto(user);
  }
  
  async login(userCreateInput: UserLoginInputDto): Promise<UserCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: userCreateInput.email,
        isConfirmed: true,
        isDisabled: false
      },
      include: [ Entity ]
    });
    if (!user) throw new HttpException('User not found or not confirmed', HttpStatus.BAD_REQUEST);

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
  
  async register(registerInput: UserRegisterInputDto): Promise<UserCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: registerInput.email.toLowerCase(),
        registrationCode: registerInput.code,
        isDisabled: false,
        isConfirmed: false
      },
      include: [ Entity ]
    })
    if (!user) throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  
    user.password = await bcrypt.hash(registerInput.password, 10);
    user.registrationCode = null;
    user.isConfirmed = true;
    await user.save();
    
    const jwt = this.jwt.sign({user: user});
    if (!jwt) throw new HttpException('Token creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return {token: jwt, user: new UserOutputDto(user)};
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
