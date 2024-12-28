import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../models/models';

export const INEOStateActions = createActionGroup({
  source: 'INEOState',
  events: {

    'Get Tasks': props<{ filters?: any[], clear?:boolean }>(),
    'Get Tasks Success': props<{ data: Task[] }>(),
    'Get Tasks Failure': props<{ error: any }>(),
    'Add Task': props<{ data: Task }>(),
    'Add Task Success': emptyProps(),
    'Add Task Failure': props<{ error: any }>(),
    'Edit Task': props<{ data: Task }>(),
    'Edit Task Success': emptyProps(),
    'Edit Task Failure': props<{ error: any }>(),
    'SetStatus Task': props<{ status: string }>(),
    'SetForm Task': props<{ data: Task }>(),
    'Delete Task': props<{ id:string }>(),
    'Delete Task Success': emptyProps(),
    'Delete Task Failure': props<{ error: any }>(),
    'Edit TaskForm': props<{ data: Task }>(),
    'Edit TaskForm Success': props<{ data: Task }>(),
    'Edit TaskForm Failure': props<{ error: any }>(),
    'Reset TaskForm': emptyProps(),

  }
});
