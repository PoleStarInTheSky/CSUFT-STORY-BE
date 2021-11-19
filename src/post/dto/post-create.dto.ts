import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
//在controller中给validation pipe用的
//TODO 用正则做更安全的匹配
type PostType = 'draft' | 'formal';
enum PostTypeEnum {
  draft = 'draft',
  formal = 'formal',
}
export class CreatePostDto {
  //文章的类型判断
  @IsEnum(PostTypeEnum)
  type: PostType;

  //注意，空字符串也能通过IsString的检查
  @ValidateIf((o) => o.type === 'formal')
  @IsString()
  @MinLength(1, { message: '文章标题最短1个字' })
  @MaxLength(30, { message: '文章标题最长30个字' })
  title: string;

  @ValidateIf((o) => o.type === 'formal')
  @IsString()
  @MinLength(1, { message: '描述最短1个字' })
  @MaxLength(40, { message: '描述最长40个字' })
  desc: string;

  @ValidateIf((o) => o.type === 'formal')
  @IsNumber()
  likes: number;

  @ValidateIf((o) => o.type === 'formal')
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
