import { Module } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/modules/auth/auth.controller';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';

//  Providers
import { EntitiesProviders } from 'src/core/providers/entities.providers';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1y',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    ...EntitiesProviders
  ],
  controllers: [AuthController]
})
export class AuthModule {}
