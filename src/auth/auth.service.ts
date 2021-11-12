import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  /*
   *async的返回值一定是一个Promise对象
   *Promise<void>，这里的void泛型意思是Promise resolve的值是void，即undefined
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    //bcrypt是一种加密算法，第二个参数越高表示生成的哈希越安全
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ username, password: hashedPassword });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }
}
