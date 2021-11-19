import { Document } from 'mongoose';
//Mongodb依赖注入时用的interface
//为了得到更好的ts支持
export interface Post extends Document {
  readonly title: string;
  readonly desc: string;
  readonly header_img: string;
  readonly author: string;
  readonly date_posted: string;
  readonly date_updated: string;
}
