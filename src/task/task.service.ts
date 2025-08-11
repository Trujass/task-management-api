import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { type FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = []

    create(task: TaskDto) {
        this.tasks.push(task);
        return {
            status: HttpStatus.CREATED,
            message: 'Task criada com sucesso'
        }
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);

        if (foundTask.length) {
            return foundTask[0]
        }
        throw new HttpException(`Task ${id} nao encontrada`, HttpStatus.NOT_FOUND);
    }
    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter(t => {
            let match = true;

            if (params.title != undefined && t.title.includes(params.title)) {
                match = false;
            }

            if (params.status != undefined && t.status.includes(params.status)) {
                match = false;
            }
            return match;
        })

    }

    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if (taskIndex >= 0) {
            this.tasks[taskIndex] = task;
            return {
                status: HttpStatus.OK,
                message: `Task ${task.id} atualizada com sucesso`
            }
        }
        throw new HttpException(`Task ${task.id} nao encontrado`, HttpStatus.BAD_REQUEST);
    }
    remove(id: string): TaskDto {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex >= 0) {
            return this.tasks.splice(taskIndex, 1)[0];

        }
        throw new HttpException(`Task ${id} nao encontrado`, HttpStatus.NOT_FOUND)
    }
}
