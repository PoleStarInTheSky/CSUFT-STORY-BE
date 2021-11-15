import { Document } from 'mongoose';
//Mongodb依赖注入时用的interface
export interface HeaderImg extends Document {
  readonly name: string;
  readonly url: string;
}
