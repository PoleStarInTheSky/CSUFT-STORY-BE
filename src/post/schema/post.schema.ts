import * as mongoose from 'mongoose';
//MongodbModule引入时配置的schema
export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  header_img: {
    type: String,
    required: true,
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
