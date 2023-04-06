import { Schema, model } from 'mongoose';

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
