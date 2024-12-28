import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { INEOStateActions } from './ineo-state.actions';
import { TaskServicesService } from '../../service/task-services.service';
import { MessageService } from 'primeng/api';


@Injectable()
export class INEOStateEffects {

  getTasks$ = createEffect (() =>{
    return this.actions$.pipe(
      ofType(
        INEOStateActions.getTasks, 
        INEOStateActions.addTaskSuccess, 
        INEOStateActions.editTaskSuccess, 
        INEOStateActions.deleteTaskSuccess, 
      ),
      concatMap((payload)=>
        this.task_service.getTasks(payload).pipe(
          map(response => {
              // Crea un Set per memorizzare gli ID unici
              const uniqueIds = new Set();
              // Filtra la risposta mantenendo solo gli oggetti con ID unici
              const uniqueTasks = response.filter(task => {
                if (!uniqueIds.has(task.id)) {
                  uniqueIds.add(task.id);
                  return true;
                }
                return false;
              });
              return INEOStateActions.getTasksSuccess({ data: uniqueTasks });
            
          }),
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Get Tasks Failure' })

            return of(INEOStateActions.getTasksFailure(error))
          }
          )
        )
      )
    )
  
  }, {functional:true});

  postTask$ = createEffect (() =>{
    return this.actions$.pipe(
      ofType(INEOStateActions.addTask),
      concatMap(({data})=>
        this.task_service.postTask(data).pipe(
          map(response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Add Task Success' })
            return INEOStateActions.addTaskSuccess()
          }),
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Add Task Failure' })

            return of(INEOStateActions.addTaskFailure(error))
          }
          )
        )
      )
    )
  
  }, {functional:true});

  deleteTask$ = createEffect (() =>{
    return this.actions$.pipe(
      ofType(INEOStateActions.deleteTask),
      concatMap(({id})=>
        this.task_service.deleteTask(id).pipe(
          map(response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Delete Task Success' })
            return INEOStateActions.deleteTaskSuccess()
          }),
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Delete Task Failure' })

            return of(INEOStateActions.deleteTaskFailure(error))
          }
          )
        )
      )
    )
  
  }, {functional:true});

  editTask$ = createEffect (() =>{
    return this.actions$.pipe(
      ofType(INEOStateActions.editTask),
      concatMap(({data})=>
        this.task_service.editTask(data).pipe(
          map(response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Edited Task Success' })
            return INEOStateActions.editTaskSuccess()
          }),
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Edited Task Failure' })

            return of(INEOStateActions.editTaskFailure(error))
          }
          )
        )
      )
    )
  
  }, {functional:true});



  constructor(private actions$: Actions, private task_service:TaskServicesService,  private messageService: MessageService) {}
}
