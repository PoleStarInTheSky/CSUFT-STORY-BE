import { IsISO8601, IsString, MaxLength, MinLength } from 'class-validator';
//在controller中给validation pipe用的

export class CreatePostDto {
  //完全重构 不再使用 ValidateIf 装饰器

  //注意，空字符串也能通过 IsString 的检查
  //但是空字符串无法通过 mongoose 的required:true 检查
  @IsString({ message: '文章标题必须是字符类型' })
  @MinLength(1, { message: '文章标题最短1个字' })
  @MaxLength(30, { message: '文章标题最长30个字' })
  title: string;

  @IsString({ message: '描述必须是字符类型' })
  @MinLength(1, { message: '描述最短1个字' })
  @MaxLength(40, { message: '描述最长40个字' })
  desc: string;

  @IsString({ message: '文章必须是字符类型' })
  @MinLength(100, { message: '文章最短100个字' })
  body: string;

  //不对点赞数做校验
  // @IsNumber(undefined, { message: '点赞数必须是数字类型' })
  // likes: number;

  @IsString()
  header_img: string;

  @IsString({ message: '作者必须是字符类型' })
  author: string;

  //验证符合ISO8601的时间格式
  @IsISO8601(undefined, { message: '时间格式必须是ISO8601字符串' })
  date_posted: string;

  //验证符合ISO8601的时间格式
  @IsISO8601(undefined, { message: '时间格式必须是ISO8601字符串' })
  date_updated: string;
}
