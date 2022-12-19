import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthController } from './controller/auth.controller';
import { Auth } from './entities/auth.entity';
import { AuthService } from './service/auth.service';

console.log(process.env.JWT_SECRET_KEY);

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Auth,User])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtService],
})
export class AuthModule {}
