import { IsISO8601, IsString } from 'class-validator';
//在controller中给validation pipe用的

export class CreateDraftDto {
  //完全重构 不再使用 ValidateIf 装饰器

  //注意，空字符串也能通过 IsString 的检查
  //但是空字符串无法通过 mongoose 的required:true 检查
  @IsString({ message: '文章标题必须是字符类型' })
  title: string;

  @IsString({ message: '描述必须是字符类型' })
  desc: string;

  @IsString({ message: '文章必须是字符类型' })
  body: string;

  @IsString({ message: '头图链接必须是字符类型' })
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
