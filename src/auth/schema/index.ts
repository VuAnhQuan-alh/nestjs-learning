import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UsersDocument = HydratedDocument<Users>;
@Schema({ timestamps: true, collection: 'users' })
export class Users {
  @Prop({ unique: true, default: null })
  username: string | null;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: false })
  confirmed: boolean;

  @Prop({ required: true })
  hash_password: string;

  @Prop({ default: null })
  avatar: string | null;

  @Prop({ default: null })
  content: string | null;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
