import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// Services
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from 'src/core/entities/user.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserCreateInputDto } from 'src/core/dtos/user/userCreateInputDto';
import { UserCreateOutputDto } from 'src/core/dtos/user/userCreateOutputDto';
import { UserChangePasswordInput } from 'src/core/dtos/user/userChangePasswordInput';


@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY)
              private userRepository: typeof User,
              private readonly jwt: JwtService) {}
  
  async login(userCreateInput: UserCreateInputDto): Promise<UserCreateOutputDto> {
    return this.userRepository.findOne({
      where: {
        email: userCreateInput.email
      }
    })
      .then(async user => {
        user = user.toJSON();
        if (!user) throw new HttpException('No user found with this email', HttpStatus.NOT_FOUND);
  
        const isValid = await bcrypt.compare(userCreateInput.password, user.password);
        if (!isValid) throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
  
        const jwt = this.jwt.sign({user: user});
        if (!jwt) throw new HttpException('Token creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
        
        delete user.password
        return {token: jwt, user: user};
      })
      .catch(err => {
        console.log(err)
        throw new HttpException(`User not found`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
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
  
    delete userCreated.password
    return {token: jwt, user: userCreated};
  }
}
