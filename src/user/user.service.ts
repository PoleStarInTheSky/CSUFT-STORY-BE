import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import * as bcrypt from 'bcrypt';
import { User } from './interface/user.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {}
  /*
   *async的返回值一定是一个Promise对象
   *Promise<void>，这里的void泛型意思是Promise resolve的值是void，即undefined
   */
  async register(userRegisterDto: UserRegisterDto) {
    const { account, password } = userRegisterDto;

    //bcrypt是一种加密算法，第二个参数越高表示生成的哈希越安全
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new this.userModel({ account, password: hashedPassword });

    try {
      //储存成功直接返回数据库信息
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('用户已存在');
      }
      throw error;
    }
  }

  //验证用户是否存在的逻辑在local-auth-guard里面，这里只做简单的token签发
  async login(user: User) {
    return this.authService.certificateUser(user);
  }
}
