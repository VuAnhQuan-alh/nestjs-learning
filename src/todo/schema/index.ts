import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true, collection: 'todo' })
export class Todo {
  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ default: new Date() })
  createdOfDate: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
