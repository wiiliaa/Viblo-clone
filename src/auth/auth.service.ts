import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './JWT/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    const { username, password, name, phone } = createUserDto;
    const user = new User();
    user.username = username;
    user.password = password;
    user.name = name;
    user.phone = phone;

    await user.save();
    return user;
  }

  async login(
    authCredentials: AuthCredentials,
  ): Promise<{ accessToken: string; message }> {
    const username = await this.validateUserPassword(authCredentials);
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken, message: 'Login success' };
  }

  async validateUserPassword(authCredentials: AuthCredentials) {
    const { username, password } = authCredentials;
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      throw new UnauthorizedException('email or password is wrong');
    }
  }
}
