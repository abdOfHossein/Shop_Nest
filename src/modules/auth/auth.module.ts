import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthController } from './controller/auth.controller';
import { Auth } from './entities/auth.entity';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret:'secret',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Auth,User])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtService],
})
export class AuthModule {}
