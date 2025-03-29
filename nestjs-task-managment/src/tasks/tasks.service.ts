import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor( private tasksRepository: TasksRepository){
    }
    
    public getTaskById(id:string) : Promise<Task>{
        return this.tasksRepository.getTaskById(id);
    }

    public createTask (createTaskDTO: CreateTaskDTO): Promise<Task>{
        return this.tasksRepository.createTask(createTaskDTO);
    }

    public deleteTaskById(id:string): void{
        this.tasksRepository.deleteTaskById(id);
    };

    public getTasksWithFilters(filterDto: GetTasksDTO): Promise<Task[]>{
        return this.tasksRepository.getTasksWithFilters(filterDto);
    }


    public updateTaskStatusById(id:string, newStatus: TaskStatus): Promise<Task>{
        return this.tasksRepository.updateTaskStatusById(id, newStatus);
    }
}
