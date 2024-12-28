import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, Task_Form } from '../../models/models';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Store } from '@ngrx/store';
import { selectForm_task } from '../../store/ineo_state/ineo-state.reducer';

@Component({
  selector: 'app-form',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,InputTextModule,TextareaModule],
  template: `
    <form [formGroup]="dynamicForm" class="flex flex-column  h-auto w-full">
      <div class="flex w-full flex-column gap-2">
        
        <div class="flex flex-column gap-4">
          @for(field of structure; track field){
              @if(field.name !== 'id' && field.name !=='status'){
                <div class="flex flex-column gap-2">
                  <label >{{field.title}}</label>
                  <ng-container [ngSwitch]="field.type">
                    <input *ngSwitchCase="'text'" pInputText [placeholder]="field.placeholder" [formControlName]="field.name"/>
                    <textarea *ngSwitchCase="'textarea'" rows="5" cols="30" pTextarea [formControlName]="field.name"></textarea>
                  </ng-container>
                </div>
              }
          }
        </div>
      </div>
    </form>
  `,
  styles: `
 
  `,
})
export class FormComponent {
  @Input() structure: Task_Form[] = [];
  @Input() edit: boolean = false;
  @Output() formChange = new EventEmitter<any>();

  dynamicForm: FormGroup;
  form_task: Signal<Task>;
  constructor(private fb: FormBuilder, private store:Store) {

    this.form_task = this.store.selectSignal(selectForm_task);
  }

  ngOnInit() {
    
    this.buildForm();
  }

  buildForm(): void {
    
      let formGroupConfig: { [key: string]: FormControl } = {};
  
      this.structure.forEach((field) => {
        let validators = [];
        
        // add required validator if the field have required
        if (field.required !== false) {
          validators.push(Validators.required);
        }
  
        formGroupConfig[field.name] = new FormControl(field.value || '', validators);
      });
  
      this.dynamicForm = this.fb.group(formGroupConfig);
      this.formChange.emit(this.dynamicForm);
  
      // emit form 
      this.dynamicForm.valueChanges.subscribe((controls) => {
      
        this.formChange.emit(this.dynamicForm);
      });
  }

}
