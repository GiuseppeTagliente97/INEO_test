import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { INEOStateActions } from './ineo-state.actions';
import { Task } from '../../models/models';

export const INEOStateFeatureKey = 'INEOState';

export interface State {

  loading:boolean;
  tasks:Task[];
  form_task:Task;
  edit_or_add:boolean;
}

export const initialState: State = {

  loading:false,
  tasks:[],
  form_task:{id:'',title:'',description:'',status:''},
  edit_or_add:false
};

export const reducer = createReducer(
  initialState,
  on(INEOStateActions.getTasks, (state) => ({
    ...state,
    loading:true

  })),
  on(INEOStateActions.getTasksSuccess, (state, action) => ({
    ...state,
    tasks:action.data,
    loading:false,
    edit_or_add:false

  })),
  on(INEOStateActions.editTaskForm, (state, action) => ({
    ...state,
    form_task:action.data,
  })),
  on(INEOStateActions.addTask, (state) => ({
    ...state,
    loading:true
  })),
  on(INEOStateActions.addTaskSuccess,(state)=>({
    ...state,
    form_task:{id:'',title:'',description:'',status:''},
    edit_or_add:true

  })),
  on(INEOStateActions.editTaskSuccess,(state)=>({
    ...state,
    loading:true,
    edit_or_add:true
  })),
  on(INEOStateActions.setStatusTask,(state,action)=>({
    ...state,
    form_task:{...state.form_task,status:action.status}
  }))
);

export const iNEOStateFeature = createFeature({
  name: INEOStateFeatureKey,
  reducer,
});


// selectors
export const {
  selectLoading,     
  selectTasks,      
  selectForm_task,
  selectEdit_or_add 
} = iNEOStateFeature;




