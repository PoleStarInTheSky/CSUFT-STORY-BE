import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeaderImgSchema } from './schema/header-img.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HeaderImg', schema: HeaderImgSchema, collection: 'header-img' },
    ]),
  ],
  providers: [ResourceService],
  controllers: [ResourceController],
})
export class ResourceModule {}
