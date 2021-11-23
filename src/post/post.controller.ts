import {
  Controller,
  HttpStatus,
  Body,
  Res,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  Get,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post-create.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  //使用jwt守卫鉴权
  @UseGuards(JwtAuthGuard)
  @Post()
  async addPost(
    @Request() req,
    @Res() res,
    //使用管道验证对象
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ) {
    const newPost = await this.postService.addPost(
      createPostDto,
      req.user.account as string,
    );
    return res.status(HttpStatus.OK).json(newPost);
  }

  //用id查找
  //TODO 加入Object ID的验证管道
  @Get(':postID')
  async getPost(@Res() res, @Param('postID') postID) {
    //如果路径名是random，那么随机返回一篇故事
    if (postID == 'random') {
      const randomPost = await this.postService.getRandomPost();
      return res.status(HttpStatus.OK).json(randomPost);
    }
    //获取特定一篇故事
    const post = await this.postService.getPost(postID);
    return res.status(HttpStatus.OK).json(post);
  }

  //全部查找,按故事创建时间排序
  @Get()
  async getPosts(@Res() res) {
    const posts = await this.postService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }
  //Put 和 Patch 的区别：
  //Put 由客户端提供完整的更新内容
  //Patch 由客户端提供需要更新的内容
  @UseGuards(JwtAuthGuard)
  @Put(':postID')
  async editPost(
    @Res() res,
    @Request() req,
    @Param('postID') postID,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ) {
    const editedPost = await this.postService.editPost(
      postID,
      createPostDto,
      req.user.account as string,
    );
    // 抛出错误的方式 vs http回复报文
    if (!editedPost) {
      throw new NotFoundException('所编辑的故事不存在！');
    }
    return res.status(HttpStatus.OK).json(editedPost);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':postID')
  async deletePost(@Res() res, @Request() req, @Param('postID') postID) {
    const deletedPost = await this.postService.deletePost(
      postID,
      req.user.account as string,
    );
    if (!deletedPost) {
      throw new NotFoundException('所删除的故事不存在!');
    }
    return res.status(HttpStatus.OK).json({
      message: '故事已被删除',
      post: deletedPost,
    });
  }
}
