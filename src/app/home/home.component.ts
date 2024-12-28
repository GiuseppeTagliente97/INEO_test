import { Component, Signal } from '@angular/core';
import { TableComponent } from "../shared/table/table.component";
import { Task } from '../models/models';
import { Store } from '@ngrx/store';
import { INEOStateActions } from '../store/ineo_state/ineo-state.actions';
import { selectEdit_or_add, selectTasks } from '../store/ineo_state/ineo-state.reducer';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [TableComponent],
  template: `
  <div class="p-6">
    <div class="header_text mb-3">Task Manager</div>
    <div class="flex flex-column gap-2">
      <div class="flex justify-content-center w-full custom-container">
          <app-table  class="w-full"[cols]="cols" [data]="data_table()" (filterChange)="setFilter($event)" (filterClear)="clearFilter($event)"></app-table>
      </div>
    </div>
  </div>

  `,
  styles: `
  .custom-container {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); 
    border-radius: 10px;
    border: 2px solid #51328a; 
    padding: 16px; 
    background-color: #fff; 
}
`
})
export class HomeComponent {
  formStructure = [
    { title: 'Title', name: 'title', placeholder: 'Insert title', type:'text', required:true },
    { title: 'Description', name: 'description', placeholder: 'Insert Description', type:'textarea', required:false },
  ];

  cols:any[] =['id','title','description','status', 'option']
  edit_or_add:Signal<boolean>
  data_table:Signal<Task[]>
 
  tmp:Task[]
  constructor(private store:Store){
    this.data_table=this.store.selectSignal(selectTasks)
  }

  ngOnInit() {
    
    this.store.selectSignal(selectTasks)
  }

  setFilter(event){
    
    this.store.dispatch(INEOStateActions.getTasks({filters:event}))

  }

  
  clearFilter(event){
    
   
    this.store.dispatch(INEOStateActions.getTasks({filters:event}))

  }

}
