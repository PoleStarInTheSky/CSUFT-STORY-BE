import { IsISO8601, IsString, MaxLength, MinLength } from 'class-validator';
//在controller中给validation pipe用的
//TODO 用正则做更安全的匹配
export class CreatePostDto {
  @IsString()
  @MinLength(1, { message: '文章标题最短1个字' })
  @MaxLength(30, { message: '文章标题最长30个字' })
  title: string;

  @IsString()
  @MinLength(1, { message: '描述最短1个字' })
  @MaxLength(40, { message: '描述最长40个字' })
  desc: string;

  @IsString()
  header_img: string;

  @IsString()
  author: string;

  //验证符合ISO8601的时间格式
  @IsISO8601()
  date_posted: string;

  //验证符合ISO8601的时间格式
  @IsISO8601()
  date_updated: string;
}
