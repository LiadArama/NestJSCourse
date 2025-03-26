import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    public getAllTasks(){
        return this.tasks;
    }

    public getTaskById(id: string): Task{
        const [res] = this.tasks.filter((task:Task)=>  task.id === id ? task : null);
        return res;
    }

    public createTask(createTaskDTO: CreateTaskDTO): Task{
        const task: Task = {
            id: uuid(),
            ...createTaskDTO,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }
}
