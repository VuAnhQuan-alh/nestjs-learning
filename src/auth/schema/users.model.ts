import { Schema } from 'mongoose';

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      maxLength: 32,
      required: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export { UsersSchema };
