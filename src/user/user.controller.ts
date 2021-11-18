import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /*
   *Pipe在一个方法调用前就会调用并拿到参数，他做的事就是对参数的转换或者验证
   *DTO要使用类型而不是接口，这样能使用很多类验证的装饰器
   */
  @Post('/register')
  async register(
    @Body(ValidationPipe) userRegisterDto: UserRegisterDto,
  ): Promise<void | string> {
    return await this.userService.register(userRegisterDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async signIn(@Request() req) {
    //下面只是简单签发jwt，验证的步骤由guard完成

    return this.userService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Request() req) {
    return req.user;
  }
}
