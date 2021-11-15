import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeaderImg } from './interface/header-img.interface';
@Injectable()
export class ResourceService {
  constructor(
    @InjectModel('HeaderImg') private readonly userModel: Model<HeaderImg>,
  ) {}
  async getRandomHeader() {
    const cnt = await this.userModel.count().exec();
    //均匀生成[0,cnt-1]的整数
    const random = Math.floor(Math.random() * cnt);
    const res = await this.userModel.findOne().skip(random).exec();
    return res;
  }
}
