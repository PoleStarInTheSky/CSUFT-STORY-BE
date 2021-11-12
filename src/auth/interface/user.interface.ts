import { Document } from 'mongoose';
//user interface可以保证user model不变
export interface User extends Document {
  readonly username: string;
  readonly password: string;
}
