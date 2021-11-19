import { Document } from 'mongoose';
//Mongodb依赖注入时用的interface
//为了得到更好的ts支持
export interface User extends Document {
  readonly account: string;
  readonly password: string;
}
