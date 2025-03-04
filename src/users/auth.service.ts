import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    console.log(email, ':email');

    const userInfo = await this.userService.findOne({ where: { email } });
    console.log(userInfo, 'userInfo');

    if (userInfo) {
      throw new BadRequestException('Email is already in use!');
    }

    const salt = randomBytes(8).toString('hex');
    console.log('Random Salt', salt);

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    console.log(hash, 'hash');

    const hashPassword = `${salt}.${hash.toString('hex')}`;

    const user = await this.userService.createUser(email, hashPassword);

    return user;
  }

  async signin(email: string, password: string) {
    const userInfo = await this.userService.findOne({ where: { email } });
    console.log(userInfo, 'userInfo');

    if (!userInfo) {
      throw new NotFoundException('User Not found!');
    }

    const [salt, storedHash] = userInfo.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      return { access_token: this.jwtService.sign({username: userInfo.email, sub: userInfo.id }) };
    } else {
      throw new BadRequestException('Your Password is incorrect!');
    }
  }
}
