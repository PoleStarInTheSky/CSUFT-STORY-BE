import * as mongoose from 'mongoose';
//MongodbModule引入时配置的schema
export const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  header_img: {
    type: String,
  },
  likes: { type: Number },
  type: { type: String, required: true },
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
