import { IsString, MaxLength, MinLength } from 'class-validator';
//在controller中给validation pipe用的
export class UserRegisterDto {
  @IsString()
  @MinLength(4, { message: 'account is too short (4 characters min)' })
  @MaxLength(20, { message: 'account is too long (20 characters max)' })
  account: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  password: string;
}
