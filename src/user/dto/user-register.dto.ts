import { IsString, MaxLength, MinLength } from 'class-validator';
//在controller中给validation pipe用的
//TODO 用正则做更安全的匹配
export class UserRegisterDto {
  @IsString()
  @MinLength(4, { message: '账号最短4位' })
  @MaxLength(20, { message: '账号最长20位' })
  account: string;

  @IsString()
  @MinLength(8, { message: '密码最短8位' })
  @MaxLength(20, { message: '密码最长20位' })
  password: string;
}
