import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";
import { NotFoundException } from "@nestjs/common";
import { GetTasksDTO } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{

    public async getTaskById(id: string): Promise<Task>{
        const res = await this.findOne({id});
        if(!res) throw new NotFoundException(`Task with ID = ${id} Not Found!`);
        return res;
    }

    public async createTask(createTaskDTO: CreateTaskDTO): Promise<Task>{
        const task = this.create({
            ...createTaskDTO,
            status: TaskStatus.OPEN
        });

        await this.save(task);
        return task;
    };
    
    public async deleteTaskById(id: string): Promise<void>{
        const result = await this.delete({id})
        if(!result.affected) throw new NotFoundException(`Task with ID = ${id} Not Found!`)
    }

    public async updateTaskStatusById(id:string, newStatus: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = newStatus;
        await this.save(task);
        return task;
    }

    public async getTasksWithFilters(filterDto: GetTasksDTO): Promise<Task[]>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('tasks');
        if(status) query.andWhere('task.status=:status', {status});
        if(search) query.andWhere('task.title LIKE :search OR task.description LIKE :search ', {search: `%${search}%`});

        return await query.getMany();
    }
    
}