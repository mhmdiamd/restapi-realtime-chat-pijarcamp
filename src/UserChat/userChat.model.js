import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserChatSchema = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    lastMessage : {
      type: Object,
    }
  },
  {
    timestamps: true,
  }
);

export default model('UserChat', UserChatSchema);
