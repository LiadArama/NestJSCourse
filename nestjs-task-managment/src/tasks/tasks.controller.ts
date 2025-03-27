import { Body, Controller, Get, Post, Param, Query, Delete, Patch } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){
    }

    @Get()
    public getTasks(@Query() filterDto: GetTasksDTO): Task[]{
        if(Object.keys(filterDto).length)
            return this.tasksService.getTasksWithFilters(filterDto);
         else return this.tasksService.getAllTasks();
    }

    @Get(':id')
    public getTaskById(
        @Param('id') id: string
    ): Task{
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
    public createTask(
        @Body() createTaskDTO: CreateTaskDTO
    ): Task{
        return this.tasksService.createTask(createTaskDTO);
    }

    @Delete(':id')
    public deleteTaskById(
        @Param('id') id:string
    ) : void{
        this.tasksService.deleteTaskById(id);
    }

    @Patch(':id/status')
    public  updateTaskStatusById(
        @Param('id') id:string, 
        @Body() updateTaskStatusDto: UpdateTaskStatusDTO
    ) : Task {
        const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatusById(id, status);
    }
}
