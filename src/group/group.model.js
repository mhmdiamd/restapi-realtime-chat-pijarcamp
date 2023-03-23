import { Schema, model } from 'mongoose';

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    photo: {
      type: String
    },
    roomMasterId: {
      type: String,
      required: true,
    },
    members: {
      type: Array,
    },
    lastMessage : {
      type: Object,
    }
  },
  {
    timestamps: true,
  }
);

export default model('group', GroupSchema);
