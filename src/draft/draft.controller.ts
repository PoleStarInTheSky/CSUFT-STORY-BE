import {
  Controller,
  UseGuards,
  Request,
  Res,
  Body,
  ValidationPipe,
  Param,
  HttpStatus,
  Put,
  Delete,
  NotFoundException,
  Get,
  Post,
} from '@nestjs/common';
import { DraftService } from './draft.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateDraftDto } from './dto/draft-create.dto';
@Controller('draft')
export class DraftController {
  constructor(private draftService: DraftService) {}

  //使用jwt守卫鉴权
  @UseGuards(JwtAuthGuard)
  @Post()
  async addDraft(
    @Request() req,
    @Res() res,
    //使用管道验证对象
    @Body(ValidationPipe) createDraftDto: CreateDraftDto,
  ) {
    const newDraft = await this.draftService.addDraft(
      createDraftDto,
      req.user.account as string,
    );
    return res.status(HttpStatus.OK).json(newDraft);
  }

  //用id查找
  //TODO 加入Object ID的验证管道
  @Get(':draftID')
  async getDraft(@Res() res, @Param('draftID') draftID) {
    //获取特定一篇草稿
    const draft = await this.draftService.getDraft(draftID);
    return res.status(HttpStatus.OK).json(draft);
  }

  //Put 和 Patch 的区别：
  //Put 由客户端提供完整的更新内容
  //Patch 由客户端提供需要更新的内容
  @UseGuards(JwtAuthGuard)
  @Put(':draftID')
  async editDraft(
    @Res() res,
    @Request() req,
    @Param('draftID') draftID,
    @Body(ValidationPipe) createDraftDto: CreateDraftDto,
  ) {
    const editedDraft = await this.draftService.editDraft(
      draftID,
      createDraftDto,
      req.user.account as string,
    );
    // 抛出错误的方式 vs http回复报文
    if (!editedDraft) {
      throw new NotFoundException('所编辑的草稿不存在！');
    }
    return res.status(HttpStatus.OK).json(editedDraft);
  }
  //删除一篇草稿
  @UseGuards(JwtAuthGuard)
  @Delete(':draftID')
  async deleteDraft(@Res() res, @Request() req, @Param('draftID') draftID) {
    const deletedDraft = await this.draftService.deleteDraft(
      draftID,
      req.user.account as string,
    );
    if (!deletedDraft) {
      throw new NotFoundException('所删除的草稿不存在!');
    }
    return res.status(HttpStatus.OK).json({
      message: '草稿已被删除',
      draft: deletedDraft,
    });
  }
}
