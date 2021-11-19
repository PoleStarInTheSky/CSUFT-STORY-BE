import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './interface/post.interface';
import { CreatePostDto } from './dto/post-create.dto';
@Injectable()
export class PostService {
  //依赖注入 Post collection
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}
  //创建新的博客
  async addPost(
    createPostDto: CreatePostDto,
    reqAccount: string,
  ): Promise<Post> {
    if (reqAccount !== createPostDto.author) {
      throw new ForbiddenException('只能创建自己的故事');
    }
    const newPost = await new this.postModel(createPostDto);
    try {
      //储存成功直接返回数据库信息
      return await newPost.save();
    } catch (error) {
      throw error;
    }
  }
  //查找某一篇博客
  async getPost(postID): Promise<Post> {
    const post = await this.postModel.findById(postID).exec();
    if (!post) {
      throw new NotFoundException('所查找的故事不存在');
    }
    return post;
  }
  //查找所有博客，按照创建日期从新到旧排列
  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find().sort({ date_posted: 1 }).exec();
    return posts;
  }
  //编辑某一篇博客
  async editPost(
    postID: string,
    createPostDto: CreatePostDto,
    reqAccount: string,
  ): Promise<Post> {
    if (reqAccount !== createPostDto.author) {
      throw new ForbiddenException('只能编辑自己的故事');
    }
    //{new:true} 表示返回更新后的document
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      createPostDto,
      { new: true },
    );
    return editedPost;
  }
  //删除某一篇博客
  async deletePost(postID: string, reqAccount: string): Promise<any> {
    const toDeletedPost = await this.postModel.findById(postID);
    if (toDeletedPost.author !== reqAccount) {
      throw new ForbiddenException('只能删除自己的故事');
    }
    return await toDeletedPost.remove();
  }
}
