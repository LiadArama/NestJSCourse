import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){
    }

    @Get()
    public getAllTasks(): Task[]{
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    public getTaskById(@Param('id') id: string): Task{
        return this.tasksService.getTaskById(id)
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
        @Body() createTaskDTO: CreateTaskDTO
    ): Task{
        return this.tasksService.createTask(createTaskDTO);
    }
}
