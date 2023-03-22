import { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);


export default model('Message', MessageSchema);
