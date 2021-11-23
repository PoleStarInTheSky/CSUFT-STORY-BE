import { Document } from 'mongoose';
export interface Draft extends Document {
  readonly title?: string;
  readonly desc?: string;
  readonly header_img?: string;
  readonly body?: string;
  readonly author: string;
  readonly date_posted: string;
  readonly date_updated: string;
}
