import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDto, UserDto } from './users.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDTO) {
    const userInfo = await this.authService.signup(body.email, body.password);
    return userInfo;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDTO) {
    const userInfo = await this.authService.signin(body.email, body.password);
    return userInfo;
  }

  @Get('/:id')
  async getUserById(@Param('id') param: string) {
    const userInfo = await this.userService.findOne({
      where: { id: Number(param) },
    });

    if (!userInfo) {
      throw new NotFoundException('User Not Found!');
    }

    return userInfo;
  }

  @Get()
  async findAllUser(@Query('email') email: string) {
    const userInfo = await this.userService.findOne({
      where: { email },
    });

    if (!userInfo) {
      throw new NotFoundException('No User has containing this', email);
    }

    return userInfo;
  }

  @Patch('/:id')
  async updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    const userInfo = await this.userService.updateUser(id, body);

    return userInfo;
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.removeUser(parseInt(id));
  }
}
