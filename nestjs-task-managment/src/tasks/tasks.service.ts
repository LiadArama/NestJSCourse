import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = ["Hi"]

    public getAllTasks(){
        return this.tasks;
    }
}
