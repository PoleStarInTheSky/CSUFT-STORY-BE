import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schema/post.schema';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema, collection: 'post' },
    ]),
    AuthModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
