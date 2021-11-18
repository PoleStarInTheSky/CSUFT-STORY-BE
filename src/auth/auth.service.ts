import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../user/interface/user.interface';

@Injectable()
export class AuthService {
  /*
   *依赖注入，用成为构造器参数的方式引入依赖，不去new一个collection的实例
   *好处是可以解耦合，只要符合对象的interface就可以得到，不需要关心底层逻辑
   */
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //简单地用jwtService签发token给客户端，controller会在调用guard之后调用这个方法
  async certificateUser(user: User) {
    const payload = { account: user.account, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  //给local strategy使用的验证方法，对用户做登录验证
  async validateUser(account: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ account });

    //因为account是唯一的，所以没找到就是失败
    if (!user) {
      return null;
    }
    //通过account验证后要使用bcrypt对密码进行验证
    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }
}
