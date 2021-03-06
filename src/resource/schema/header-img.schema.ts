import * as mongoose from 'mongoose';
//MongodbModule引入时配置的schema
export const HeaderImgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
});
