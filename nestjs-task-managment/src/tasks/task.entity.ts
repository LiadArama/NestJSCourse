import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "../tasks/tasks-status.enum";

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description:string;
    @Column()
    status: TaskStatus;
};