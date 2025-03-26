import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){
    }

    @Get()
    public getAllTasks(): Task[]{
        return this.tasksService.getAllTasks();
    }

    // @Post() // ###### ONE WAY TO DO SO is to desctruct the props we want.
    // public createTask(@Body() body): void{
    //     const {title, description} = body;
    //     console.log(body)
    //     // return this.tasksService.createTask(title, description);
    // }

    // We can also do:
    @Post()
    public createTask
    (
        @Body('title') title: string, 
        @Body('description') description: string
    ): Task{
        return this.tasksService.createTask(title, description);
    }
}
