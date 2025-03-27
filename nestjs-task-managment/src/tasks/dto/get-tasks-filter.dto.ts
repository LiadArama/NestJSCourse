import { TaskStatus } from "../tasks.model";

export class GetTasksDTO{
    status?: TaskStatus;
    search?: string;
}