import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;
}

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}
