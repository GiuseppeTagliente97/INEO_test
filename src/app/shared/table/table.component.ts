import { Component, effect, EventEmitter, Input, Output, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Task } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonComponent } from '../button/button.component';
import { Chip } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';
import { selectEdit_or_add, selectLoading } from '../../store/ineo_state/ineo-state.reducer';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Button } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-table',
  standalone:true,
  
  imports: [TooltipModule, SkeletonModule, TableModule, CommonModule, FormsModule, ButtonComponent, Chip, MultiSelectModule,OverlayPanelModule, Button,CheckboxModule],
  template: `

  

    <p-table
        [value]="table_data" 
        [columns]="cols" 
        [paginator]="true"
        [rows]="5"
        [rowsPerPageOptions]="[5, 10, 20]"
        [resizableColumns]="true"
        [globalFilterFields]="['id', 'title', 'description', 'status']"
        >

        
        <ng-template #caption>
        
                <div class="flex flex-container justify-content-between mb-2">

                    <div class="flex flex-wrap">
                        <div *ngFor="let item of filters" class="mr-2 mb-2">

                            <p-button icon="pi pi-filter-fill" rounded="true" text="true" raised="true" severity="help"  (click)="op.toggle($event)"  label="{{item}}"
                                [style]="{'border': '1px solid var(--color-primary)','cursor':'pointer'}"
                                >
                                <p-overlayPanel #op styleClass="myOverlay z-1" [style]="{'max-height':'400px','max-width':'400px'}">
                                    <p-table #ft [value]="getGroupItems(item)" [columns]="[item]" styleClass="customTable" [scrollable]="true"
                                    scrollHeight="300px" class="border-noround-bottom" [globalFilterFields]="[item]">
                                    

                                    <ng-template pTemplate="header" let-columns>
                                        <tr>
                                        <th class="filter_text" pSortableColumn={{item}}>Filter for
                                            <b>{{item.toUpperCase()}}</b>
                                        </th>
                                        </tr>
                                    </ng-template>
                                    <ng-template pTemplate="body" let-value #filter>
                                        <tr>
                                        <td>
                                            <div class=" field-checkbox">
                                            <p-checkbox styleClass="customCheck" name="group2" value="filter" [value]="value"
                                                [(ngModel)]="selectedItems[item]" [inputId]="value"></p-checkbox>
                                            <label [for]="value">{{value}}</label>
                                            </div>
                                        </td>
                                        </tr>
                                    </ng-template>

                                    </p-table>
                                    <div class="flex justify-content-center justify-content-between gap-2">
                                    <p-button label="Confirm" variant="text" raised="true" severity="help"
                                        (click)="filterTableData();" [style]="{'height':'2.1rem'}">
                                    </p-button>
                                    
                                    <p-button label="Clear" variant="text" raised="true" severity="danger"
                                        (click)="clearFilter(item);" [style]="{'height':'2.1rem'}">
                                    </p-button>
                                    </div>
                                    
                                </p-overlayPanel>
                            </p-button>

                        </div>
                    </div>
                  
                    
                    <div class=" align-content-center">
                        <app-button [type_button]="'add'" [structure]="formStructure" [overlay]="true" ></app-button>
                    </div>
                </div>

             
           
        </ng-template>

        <!-- table header -->
        <ng-template #header let-columns>
      
            <tr>
                <th pSortableColumn="{{col}}" pResizableColumn *ngFor="let col of columns" class="header">
                @if(col!=='option'){

                    <div class="column_text">{{ col|uppercase }}
                    <p-sortIcon field="{{col}}"></p-sortIcon>        
                </div>
                } 
                </th>
            </tr>
            
        </ng-template>

        <!-- table body -->
        <ng-template  #body let-data let-columns="columns">
                <tr>   
                    <td *ngFor="let col of columns;" >
                        @if(col=='option'){
                            @if(loading()){

                                <p-skeleton width="10rem" styleClass="mb-2" />
                            }@else{
                                <div class="flex gap-2">
                                <div class="flex">
                                    <app-button [type_button]="'edit'" [edit]="true" [setStructure]="data"></app-button>
                                </div>
                                <div class="flex">
                                    <app-button [type_button]="'delete'" [id]="data['id']"></app-button>
                                </div>
                            </div>
                            }
                            
                        }@else if(col == 'status'){
                            @if(loading()){
                                <p-skeleton width="10rem" styleClass="mb-2" />
                            }@else {
                                <p-chip [ngClass]="getChipClass(data[col])" label="{{ data[col] }} "></p-chip>
                            }
                        }@else{
                            @if(loading()){

                                <p-skeleton width="10rem" styleClass="mb-2" />
                            }@else {

                                <div class="truncate" pTooltip="{{ data[col] }}" tooltipPosition="right">

                                {{ data[col] }}
                                </div>
                            }

                        }
                    </td>
                </tr>    
        </ng-template>
        <ng-template #emptymessage>
        <tr>
            <td colspan="5" class="text-center text-5xl" >No Tasks found</td>
        </tr>
    </ng-template>
    </p-table>




  `,
  styles: `
  
    td {
        max-width: 200px;
    }

    .truncate {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .chip-todo {
        background-color: #a855f7;
        color: white;
    }

    .chip-in-progress {
        background-color: #ffa944;
        color: white;
    }

    .chip-completed {
        background-color: #60cb2d;
        color: white;
    }

    .header {
        background-color: var(--color-primary);;
        color: white;
    }

    ::ng-deep .p-checkbox-checked .p-checkbox-box{
        background-color: var(--color-primary);
        border-color:var(--color-primary);
    }

    @media (max-width: 768px) { 
        .flex-container {
            flex-direction: column; 
        }
    }

    @media (min-width: 768px) { 
        .flex-container {
            flex-direction: row; 
        }
    }
    
`
})
export class TableComponent {
    @Input() cols:string[]=[]
    @Input() data: Task[];
    @Output() filterChange = new EventEmitter<any>();
    @Output() filterClear = new EventEmitter<any>();

    table_data: any[];
    filters:string[]=['id', 'title', 'description', 'status']
    filterData: { [key: string]: any[] } = {};
    loading:Signal<boolean>
    edit_or_add:Signal<boolean>
    selectedItems: any = {};
    
    // structure to add a task
    formStructure = [
        { title: 'Title', name: 'title', placeholder: 'Insert title', type:'text', required:true },
        { title: 'Description', name: 'description', placeholder: 'Insert Description', type:'textarea', required:false },
    ];

    // when we add or edit we clear all filters
    edit_or_addEffect=effect(()=>{
       
        if(this.edit_or_add()==true){
            this.filters.forEach(elem=>{
                this.selectedItems[elem] = []
                let filterCleared = {...this.selectedItems}
            
                for (const key in filterCleared) {
                            
                  if (filterCleared.hasOwnProperty(key) && filterCleared[key].length == 0) {
                    delete filterCleared[key]
                      
                  }
                  
                }
            })
        }
    })

    constructor(private store:Store){

        this.loading = this.store.selectSignal(selectLoading)
        this.edit_or_add=this.store.selectSignal(selectEdit_or_add)

    }
    
    ngOnInit() {

        this.fetchData()
    }
    
    ngOnChanges(){

        this.fetchData()
    }

    
    fetchData() {

        this.table_data = this.data.map(item => ({ ...item }));
        if(this.table_data.length>0){
            for (const key in this.table_data[0]) {
                
                // delete duplicate on filters
                if (this.table_data[0].hasOwnProperty(key)) {
                    this.filterData[key]=[];
                    this.filterData[key] = Array.from(new Set(this.table_data.map(item => item[key])));
                    
                }
            }
        }
    }

    // give a class for every status
    getChipClass(status: string): string {
        switch (status) {
            case 'To Do':
                return 'chip-todo';
            case 'In Progress':
                return 'chip-in-progress';
            case 'Done':
                return 'chip-completed';
            default:
                return '';
        }
    }

    // emit to father all filters 
    filterTableData(){
        
        this.filterChange.emit(this.selectedItems)
        this.selectedItems={...this.selectedItems}
    }

    getGroupItems(column) {
        
        return this.filterData[column]
    }

    // emit to father clear single filter 
    clearFilter(column) {
   
    this.selectedItems[column] = []
    let filterCleared = {...this.selectedItems}

    for (const key in filterCleared) {
                
      if (filterCleared.hasOwnProperty(key) && filterCleared[key].length == 0) {
        delete filterCleared[key]
          
      }
      
    }
    this.filterClear.emit(filterCleared)

   
  }

    
}
