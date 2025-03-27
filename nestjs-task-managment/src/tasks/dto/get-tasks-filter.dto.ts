import { TaskStatus } from "../tasks-status.enum";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class GetTasksDTO{

    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;
    
    @IsOptional()
    @IsString()
    search: string;
    
}