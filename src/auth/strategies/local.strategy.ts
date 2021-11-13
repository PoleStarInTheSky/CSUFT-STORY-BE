import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  //通过依赖注入引入authService，因为具体的逻辑不属于strategy的一部分,应该卸载服务里面
  constructor(private authService: AuthService) {
    super();
  }

  //必须实现validate方法说明strategy的流程
  //参数从body中获取
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    //在req中加一个user段
    return user;
  }
}
