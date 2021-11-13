import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
   *Pipe在一个方法调用前就会调用并拿到参数，他做的事就是对参数的转换或者验证
   *DTO要使用类型而不是接口，这样能使用很多类验证的装饰器
   */
  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void | string> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }
}
