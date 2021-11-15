import * as mongoose from 'mongoose';
//MongodbModule引入时配置的schema
export const HeaderImgSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
