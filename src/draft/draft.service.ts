import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Draft } from './interface/draft.interface';
import { CreateDraftDto } from './dto/draft-create.dto';
@Injectable()
export class DraftService {
  //依赖注入 Draft collection
  constructor(
    @InjectModel('Draft') private readonly draftModel: Model<Draft>,
  ) {}
  //创建新的草稿
  async addDraft(
    createDraftDto: CreateDraftDto,
    reqAccount: string,
  ): Promise<Draft> {
    if (reqAccount !== createDraftDto.author) {
      throw new ForbiddenException('只能创建自己的故事');
    }
    const newDraft = await new this.draftModel(createDraftDto);
    try {
      //储存成功直接返回数据库信息
      return await newDraft.save();
    } catch (error) {
      throw error;
    }
  }
  //随机返回一篇草稿
  async getRandomDraft(): Promise<Draft> {
    const cnt = await this.draftModel.count().exec();
    //均匀生成[0,cnt-1]的整数
    const random = Math.floor(Math.random() * cnt);
    const res = await this.draftModel.findOne().skip(random).exec();
    return res;
  }
  //查找某一篇草稿
  async getDraft(draftID): Promise<Draft> {
    const draft = await this.draftModel.findById(draftID).exec();
    if (!draft) {
      throw new NotFoundException('所查找的故事不存在');
    }
    return draft;
  }
  //查找所有草稿，按照创建日期从新到旧排列
  async getDrafts(): Promise<Draft[]> {
    const drafts = await this.draftModel
      .find()
      .sort({ date_drafted: 1 })
      .exec();
    return drafts;
  }
  //编辑某一篇草稿
  async editDraft(
    draftID: string,
    createDraftDto: CreateDraftDto,
    reqAccount: string,
  ): Promise<Draft> {
    if (reqAccount !== createDraftDto.author) {
      throw new ForbiddenException('只能编辑自己的故事');
    }
    return await this.draftModel.findByIdAndUpdate(draftID, {
      new: true,
    });
  }
  //删除某一篇草稿
  async deleteDraft(draftID: string, reqAccount: string): Promise<any> {
    const toDeletedDraft = await this.draftModel.findById(draftID);
    if (toDeletedDraft.author !== reqAccount) {
      throw new ForbiddenException('只能删除自己的故事');
    }
    return await toDeletedDraft.remove();
  }
}
