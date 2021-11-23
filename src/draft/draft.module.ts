import { Module } from '@nestjs/common';
import { DraftService } from './draft.service';
import { DraftController } from './draft.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { DraftSchema } from './schema/draft.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Draft', schema: DraftSchema, collection: 'draft' },
    ]),
    AuthModule,
  ],
  providers: [DraftService],
  controllers: [DraftController],
})
export class DraftModule {}
