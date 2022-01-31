import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

// Services
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

// DTOs
import { UserSessionDto } from 'src/auth/userSessionDto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,
              private readonly jwt: JwtService) {}
  
  async validateUser(email: string,password: string): Promise<Prisma.UserUpdateInput | null> {
    const user = await this.prisma.user.findFirst({
      where: { AND: [
          { email: email},
          { deletedAt: null }
        ]
      }
    })
    
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(userCreateInput: Prisma.UserCreateInput): Promise<UserSessionDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userCreateInput.email
      }
    })
    if (!user) throw new HttpException('No user found with this email', HttpStatus.NOT_FOUND);

    const isValid = await bcrypt.compare(userCreateInput.password, user.password);
    if (!isValid) throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
    
    const jwt = this.jwt.sign({user: user});
    if (!jwt) throw new HttpException('Token creation  failed', HttpStatus.INTERNAL_SERVER_ERROR);
    
    delete user.password
    return {token: jwt,user: user};
  }
  
  async register(userCreateInput: Prisma.UserCreateInput): Promise<UserSessionDto> {
    const isEmailExists = await this.prisma.user.findFirst({
      where: {
        email: userCreateInput.email.toLowerCase()
      }
    })
    if (isEmailExists) throw new HttpException('Email already registered', HttpStatus.BAD_REQUEST);
    
    const password = await bcrypt.hash(userCreateInput.password, 10);
    userCreateInput.password = password;
    const userCreated = await this.prisma.user.create({data: userCreateInput});
    
    const jwt = this.jwt.sign({user: userCreated});
    if (!jwt) throw new HttpException('Token creation  failed', HttpStatus.INTERNAL_SERVER_ERROR);
  
    delete userCreated.password
    return {token: jwt,user: userCreated};
  }
}
