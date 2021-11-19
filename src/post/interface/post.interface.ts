import { Document } from 'mongoose';
import { type } from 'os';
//Mongodb依赖注入时用的interface
//为了得到更好的ts支持
interface Draft extends Document {
  readonly title?: string;
  readonly desc?: string;
  readonly header_img?: string;
  readonly likes?: number;
  readonly type: 'draft';
  readonly author: string;
  readonly date_posted: string;
  readonly date_updated: string;
}
interface Formal extends Document {
  readonly title: string;
  readonly desc: string;
  readonly header_img: string;
  readonly likes: number;
  readonly type: 'formal';
  readonly author: string;
  readonly date_posted: string;
  readonly date_updated: string;
}
export type Post = Draft | Formal;
