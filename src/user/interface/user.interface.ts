import { Document } from 'mongoose';
//Mongodb依赖注入时用的interface
export interface User extends Document {
  readonly account: string;
  readonly password: string;
}
