import * as mongoose from 'mongoose';
//MongodbModule引入时配置的schema
export const DraftSchema = new mongoose.Schema({
  //由于是草稿，title decs header_img body 都不做强制要求
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  header_img: {
    type: String,
  },
  body: {
    type: String,
  },
  author: {
    type: String,
    require: true,
  },
  date_posted: {
    type: String,
    required: true,
  },
  date_updated: {
    type: String,
    required: true,
  },
});
