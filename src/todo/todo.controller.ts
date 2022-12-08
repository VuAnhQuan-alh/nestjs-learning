import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from '../dto/todo';
import { ResponseData } from '../utils/handle-response-data';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodo(): Promise<ResponseData> {
    return this.todoService.findAll();
  }

  @Get(':id')
  readTodo(@Param('id') id: string): Promise<ResponseData> {
    return this.todoService.find(id);
  }

  @Post()
  createTodo(@Body() data: TodoDto): Promise<ResponseData> {
    return this.todoService.create(data);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() data: TodoDto,
  ): Promise<ResponseData> {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id): Promise<ResponseData> {
    return this.todoService.delete(id);
  }
}
