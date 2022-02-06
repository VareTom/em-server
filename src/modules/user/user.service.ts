import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Entities
import { User } from 'src/core/entities/user.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { UserUpdateInputDto } from 'src/core/dtos/user/userUpdateInputDto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof User
  ) {}

  async getOne(uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: {uuid: uuid}
    }).then(user => user.toJSON());
    
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    delete user.password;
    return user;
  }
  
  async update(user: UserUpdateInputDto,uuid: string): Promise<UserOutputDto> {
    return this.userRepository.update(user,{
      where: { uuid: uuid }
    })
      .then(() => {
        return this.userRepository.findOne({where: { uuid: uuid }})
          .then(user => {
            user = user.toJSON();
            delete user.password;
            return user;
        })
          .catch(err => {
            console.log(err);
            throw new HttpException(`Cannot retrieve user info`, HttpStatus.INTERNAL_SERVER_ERROR);
          })
    })
      .catch(err => {
        console.log(err);
        if (err.name === 'SequelizeUniqueConstraintError') throw new HttpException(`Email already registered`, HttpStatus.BAD_REQUEST);
        throw new HttpException(`User not updated`, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
