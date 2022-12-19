import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { IPaload } from '../interface/payload-jwt.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.dataSource.manager.findOne(User, {
      where: { username },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createToken(payload: IPaload): Promise<any> {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const result = await this.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!result) {
      throw new UnauthorizedException({
        message: 'username or password is wrong!!!',
      });
    }
    return await this.createToken(result);
  }
}
