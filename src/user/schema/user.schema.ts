import * as mongoose from 'mongoose';
//MongodbModule引入时配置的schema
export const UserSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
