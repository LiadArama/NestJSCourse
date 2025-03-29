import { Body, Controller, Get, Post, Param, Query, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){
    }

    @Get(':id')
    public getTaskById(
        @Param('id') id: string
    ): Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    @Post()
    public createTask(
        @Body() createTaskDTO: CreateTaskDTO
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDTO);
    }

    @Delete(':id')
    public deleteTaskById(
        @Param('id') id:string
    ) : void{
        this.tasksService.deleteTaskById(id);
    }

    // @Get()
    // public getTasks(@Query() filterDto: GetTasksDTO): Task[]{
    //     if(Object.keys(filterDto).length)
    //         return this.tasksService.getTasksWithFilters(filterDto);
    //      else return this.tasksService.getAllTasks();
    // }

 
    // @Post() // ###### ONE WAY TO DO SO is to desctruct the props we want.
    // public createTask(@Body() body): Promise<TaskEntity> {
    //     const {title, description} = body;
    //     console.log(body)
    //     return this.tasksService.createTask(body);
    // }

    // // We can also do:

    @Patch(':id/status')
    public updateTaskStatusById(
        @Param('id') id:string, 
            @Body() updateTaskStatusDto: UpdateTaskStatusDTO
    ) : Promise<Task> {
        const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatusById(id, status);
    }
}
