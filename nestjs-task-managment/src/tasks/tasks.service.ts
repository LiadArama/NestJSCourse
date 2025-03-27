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
    
    public async getTaskById(id: string): Promise<Task>{
        const res = await this.tasksRepository.findOne({id});
        if(!res) throw new NotFoundException(`Task with ID = ${id} Not Found!`);
        return res;
    }

    public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task>{
        const task = this.tasksRepository.create({
            ...createTaskDTO,
            status: TaskStatus.OPEN
        });

        await this.tasksRepository.save(task);
        return task;
    };
    // private tasks: Task[] = []

    // public getAllTasks(){
    //     return this.tasks;
    // };

    // public getTasksWithFilters(filterDto: GetTasksDTO): Task[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status)
    //         tasks = tasks.filter((task)=> task.status === status);
    //     if(search)
    //         tasks = tasks.filter((task)=> task.title.includes(search) || task.description.includes(search))
    //     return tasks;
    // }





    // public deleteTaskById(id:string): void{
    //     this.tasks.splice(this.tasks.indexOf(this.getTaskById(id)), 1);
    // };

    // public updateTaskStatusById(id:string, newStatus: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = newStatus;
    //     return task;
    // }
}
