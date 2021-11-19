import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ResourceModule } from './resource/resource.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    /* 可以使用process.env,提交的时候git忽略了.env文件，如果从仓库克隆下来，需要自己创建*/
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    ResourceModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
