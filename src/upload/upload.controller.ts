import {
  Controller,
  Post,
  UseInterceptors,
  Bind,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('upload')
export class UploadController {
  //注意，这个接口可以直接不传Content - type 避免出现 Multipart: Boundary not found
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      //使用拦截器保存到本地
      storage: diskStorage({
        destination: process.env.UPLOAD_IMG_PATH,
        filename: (req, file, cb) => {
          // 生成一个随机的 32个字符长度的 16进制字符串
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          // 传入随机生成的文件名字
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  //从中间件拿出文件并赋值给 uploadFile 函数
  @Bind(UploadedFile())
  uploadFile(image) {
    console.log(image);
  }
}
