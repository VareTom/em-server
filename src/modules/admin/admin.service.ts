import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// Entities
import { User } from 'src/core/entities/user.entity';

// DTOs
import { UserOutputDto } from 'src/core/dtos/user/userOutputDto';
import { Entity } from 'src/core/entities/entity.entity';

@Injectable()
export class AdminService {

  constructor(
      @Inject(USER_REPOSITORY)
      private userRepository: typeof User
  ) {
  }

  async getAllUsers(): Promise<UserOutputDto[]> {
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
}
