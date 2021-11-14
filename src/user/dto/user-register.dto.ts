import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @MinLength(4, { message: 'username is too short (4 characters min)' })
  @MaxLength(20, { message: 'username is too long (20 characters max)' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
}
