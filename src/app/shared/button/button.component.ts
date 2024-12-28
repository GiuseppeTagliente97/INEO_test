import { Component, Input, Signal } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Task, Task_Form } from '../../models/models';
import { FormComponent } from '../form/form.component';
import { Store } from '@ngrx/store';
import { INEOStateActions } from '../../store/ineo_state/ineo-state.actions';
import { FormGroup, FormsModule } from '@angular/forms';
import { selectForm_task } from '../../store/ineo_state/ineo-state.reducer';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-button',
  standalone:true,
  imports: [FormsModule,CommonModule,Select,ConfirmDialog, ToastModule, ButtonModule,CommonModule,Dialog,FormComponent],
  providers: [ConfirmationService, MessageService],
  template: `
    <p-toast />
    <!-- Confirm dialog when we delete task -->
    <p-confirmdialog />

    <div [ngSwitch]="type_button">
        <p-button *ngSwitchCase="'add'" icon="pi pi-plus-circle" rounded="true" text="true" raised="true" severity="help" (onClick)="display=true" label="Add Task"></p-button>
        <p-button *ngSwitchCase="'edit'" icon="pi pi-pencil" rounded="true" text="true" raised="true" severity="help"(onClick)="editPopUp()"></p-button>
        <p-button *ngSwitchCase="'delete'" icon="pi pi-times" rounded="true" text="true" raised="true" severity="danger" (click)="deleteTask($event,id)"></p-button>
    </div> 

    <!-- Popup when we add or edit task -->
    <p-dialog [(visible)]="display" [modal]="true" [header]="'Add Task'" [closable]="true" [style]="{ width: '30rem' }" >
        <ng-template pTemplate="header" >
            <div class="flex w-full justify-content-between custom-dialog-header">

                <div class="flex w-full" >
                    <span class="header_text flex align-items-center">Add Task</span>
                </div>
                <div class="flex w-full" *ngIf="edit">
                    <p-select  [options]="status" optionLabel="name" placeholder="status" class="w-full " [(ngModel)]="status_value" (onChange)="setStatus($event)"/>
                </div>
            </div>
        </ng-template>    
        <div class="flex flex-column gap-4 pt-2">    
            <div *ngIf="display" class="flex w-full">
                <app-form  class="w-full" [structure]="structure" (formChange)="form_event($event)" [edit]="edit"></app-form>
            </div>
            <div class="flex justify-content-end gap-2">
                <p-button label="Save" variant="text" raised="true" severity="help" (onClick)="edit?editTask():addTask()" [disabled]="disabled" ></p-button>
                <p-button label="Cancel" variant="text" raised="true" severity="danger" (onClick)="display=false"></p-button>
            </div>
        </div>
    </p-dialog>
`,
  styles: `

    ::ng-deep .p-dialog-header {
        border-bottom: 2px solid var(--color-primary);
    
    }

    ::ng-deep .p-confirmdialog .p-dialog-content{
        margin-top:20px
    }

    ::ng-deep .p-select{
        align-items:center;
    }

    ::ng-deep .p-dialog-footer {
        justify-content: flex-start;
        flex-direction: row-reverse;
    }

    ::ng-deep .p-dialog-title {
        color: var(--color-primary);
        font-weight: 600;
        font-size: 40px;    
    }
`
})
export class ButtonComponent {
    
    @Input() type_button:string=''
    @Input() form:string=''
    @Input() overlay:boolean=false
    @Input() structure: Task_Form[] = [];
    @Input() edit:boolean=false
    @Input() setStructure:any
    @Input() id:string
    
    display: boolean = false;
    disabled:boolean = true
    form_task: Signal<Task>;

    status:any[]=[{name:'To Do'},{name:'In Progress'},{name:'Done'}]
    status_value:any


    constructor(private store:Store, private confirmationService: ConfirmationService, private messageService: MessageService) {

        this.form_task = this.store.selectSignal(selectForm_task);
    }

    deleteTask(event: Event, id:string) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure you want to delete this task?',
            header: 'Delete Task',
            icon: 'pi pi-exclamation-triangle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'danger',
                outlined: true,
                raised:'true',
                variant:'text'

            },
            acceptButtonProps: {
                label: 'Confirm',
                severity: 'help',
                raised:'true',
                variant:'text'
            },

            accept: () => {
                this.store.dispatch(INEOStateActions.deleteTask({id:id}))

            },
            reject: () => {
            },
        });
    }

    editTask(){
        this.store.dispatch(INEOStateActions.editTask({data:this.form_task()}))
        this.display = false

    }

    addTask(){

        this.store.dispatch(INEOStateActions.addTask({data:this.form_task()}))
        this.display = false

    }

    form_event(event:FormGroup){        

        this.store.dispatch(INEOStateActions.editTaskForm({data:event.value}))

        if(event.value.status){
            this.status_value = {name:event.value.status}
        }
        this.disabled = event.valid?false:true

        
    }

    // set status when we have edit popup becouse status field is not on form
    setStatus(event){

        this.store.dispatch(INEOStateActions.setStatusTask({status:event.value.name}))
    }

    editPopUp(){
        
        this.structure = this.convertStructure(this.setStructure)
        this.display = true
    }

    // convert data task to stucture that form need
    convertStructure(data){
    
        return this.structure = [
            { title: '', name: 'status', placeholder: 'Insert Status', type:'dropdown', required:false, value:data.status },
            { title: 'Id', name: 'id', placeholder: '', type:'text', value:data.id},
            { title: 'Title', name: 'title', placeholder: 'Insert title', type:'text', required:true, value:data.title  },
            { title: 'Description', name: 'description', placeholder: 'Insert Description', type:'textarea', required:false, value:data.description  },
          ];
    }
}
