import { Document } from 'mongoose';
//Mongodb依赖注入时用的interface
export interface User extends Document {
  readonly username: string;
  readonly password: string;
}
