import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schema/user.schema';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    ConfigModule.forRoot(),
    //参数的name对应表中collection的名字，会转成小写然后加s
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      //jwt的过期时间一般是20分钟
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}