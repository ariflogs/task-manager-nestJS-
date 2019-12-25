import { CreateTaskDto } from './dto/createTask.dto';
import { Task, TaskStatus } from './tasks.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v4';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException(`no task is found of ${id} id`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),

      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): string {
    const found = this.tasks.filter(task => task.id !== id);
    if (found.length === 0) {
      throw new NotFoundException(`no task is found of ${id} id`);
    }

    this.tasks.map((task, index) => {
      if (task.id === id) {
        this.tasks.splice(index, 1);
      }
    });

    return 'task deleted';
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;

    return task;
  }
}
