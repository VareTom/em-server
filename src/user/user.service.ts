import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

// Services
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getOne(id: string): Promise<User> {
    const user = this.prisma.user.findFirst({
      where: {
        AND: [
          {id: id},
          {deletedAt: null}
        ]
      }
    })
    
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    
    return user;
  }
  
  async getAll(): Promise<User[] | [] > {
    return await this.prisma.user.findMany({
      where: { deletedAt: null }
    });
  }
  
  async update(user: Prisma.UserUpdateInput,id: string): Promise<User> {
    const userToUpdate = await this.prisma.user.findFirst({
      where: {
        AND: [
          { id: id },
          { deletedAt: null}
        ]
      }
    })
    if (userToUpdate) {
      const updatedUser = await this.prisma.user.update({
        where: { id: id },
        data: userToUpdate
      });
      if (!updatedUser) {
        throw new HttpException(`User not updated`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      return updatedUser;
    }
    if (!userToUpdate) {
      throw new HttpException(`User not found`, HttpStatus.BAD_REQUEST);
    }
    
  }
  
  async delete(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        AND: [
          {id: id},
          {deletedAt: null}
        ]
      }
    })
      .then(userToUpdate => {
        if (userToUpdate) {
          return this.prisma.user.update({
            where: {
              id: id
            },
            data: {
              deletedAt: new Date()
            }
          });
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    })
      .catch(err => {
        console.log(err)
        throw new HttpException('An error occured while retrieving user data', HttpStatus.INTERNAL_SERVER_ERROR);
      })
  }
}
