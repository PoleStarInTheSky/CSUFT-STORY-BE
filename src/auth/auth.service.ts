import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './interface/user.interface';

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

  /*
   *async的返回值一定是一个Promise对象
   *Promise<void>，这里的void泛型意思是Promise resolve的值是void，即undefined
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void | string> {
    const { username, password } = authCredentialsDto;

    //bcrypt是一种加密算法，第二个参数越高表示生成的哈希越安全
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ username, password: hashedPassword });

    try {
      await user.save();
      return 'Sign up successfully';
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  //简单地用jwtService签发token给客户端，controller会在调用guard之后调用这个方法
  async signIn(user: User) {
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  //验证用户的具体逻辑
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    //因为username是唯一的，所以没找到就是失败
    if (!user) {
      return null;
    }
    //通过username验证后要使用bcrypt对密码进行验证
    const valid = await bcrypt.compare(pass, user.password);

    if (valid) {
      return user;
    }

    return null;
  }
}
