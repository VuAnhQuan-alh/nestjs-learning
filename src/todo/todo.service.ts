import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema';
import { Model } from 'mongoose';
import { TodoDto } from '../dto/todo';
import {
  ResponseSuccess,
  ResponseError,
  ResponseData,
} from '../utils/handle-response-data';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<ResponseData<TodoDocument[]>> {
    try {
      const todo = await this.todoModel.find({});
      return ResponseSuccess(HttpStatus.OK, 'Read list todo successful!', todo);
    } catch (error) {
      return ResponseError(
        HttpStatus.BAD_REQUEST,
        'Read list todo failed!',
        error.message,
      );
    }
  }

  async find(id: string): Promise<ResponseData<TodoDocument>> {
    try {
      const todo = await this.todoModel.findOne({ _id: id });
      return ResponseSuccess(HttpStatus.OK, 'Read todo successful!', todo);
    } catch (error) {
      return ResponseError(
        HttpStatus.BAD_REQUEST,
        'Read todo failed!',
        error.message,
      );
    }
  }

  async create(data: TodoDto): Promise<ResponseData<TodoDocument>> {
    try {
      const todo = await this.todoModel.create(data);
      return ResponseSuccess(
        HttpStatus.CREATED,
        'Created todo successful!',
        todo,
      );
    } catch (error) {
      return ResponseError(
        HttpStatus.BAD_REQUEST,
        'Create todo failed!',
        error.message,
      );
    }
  }

  async update(id: string, data: TodoDto): Promise<ResponseData<TodoDocument>> {
    try {
      await this.todoModel.findOneAndUpdate({ _id: id }, { $set: data });
      return ResponseSuccess(
        HttpStatus.ACCEPTED,
        'Updated todo successful!',
        null,
      );
    } catch (error) {
      return ResponseError(
        HttpStatus.BAD_REQUEST,
        'Update todo failed!',
        error.message,
      );
    }
  }

  async delete(id: string): Promise<ResponseData<TodoDocument>> {
    try {
      await this.todoModel.deleteOne({ _id: id });
      return ResponseSuccess(
        HttpStatus.ACCEPTED,
        'Deleted todo successful!',
        null,
      );
    } catch (e) {
      return ResponseError(
        HttpStatus.BAD_REQUEST,
        'Delete todo failed!',
        e.message,
      );
    }
  }
}
