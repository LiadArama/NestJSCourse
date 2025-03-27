import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    public getAllTasks(){
        return this.tasks;
    };

    public getTasksWithFilters(filterDto: GetTasksDTO): Task[]{
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        if(status)
            tasks = tasks.filter((task)=> task.status === status);
        if(search)
            tasks = tasks.filter((task)=> task.title.includes(search) || task.description.includes(search))
        return tasks;
    }

    public getTaskById(id: string): Task{
        const [res] = this.tasks.filter((task:Task)=>  task.id === id ? task : null);
        if(!res) throw new NotFoundException(`Task with ID = ${id} Not Found!`);
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
    };

    public deleteTaskById(id:string): void{
        this.tasks.splice(this.tasks.indexOf(this.getTaskById(id)), 1);
    };

    public updateTaskStatusById(id:string, newStatus: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = newStatus;
        return task;
    }
}
