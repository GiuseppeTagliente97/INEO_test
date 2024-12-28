import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { HeaderData } from './models/models';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { Toast, ToastModule } from 'primeng/toast';
import { INEOStateActions } from './store/ineo_state/ineo-state.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ButtonModule, Toast, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'INEO_Project';

  // input data to fill header
  header_data: HeaderData[] = [
    {
      title:'Task Manager',
      router:'/home'
    },
    {
      title:'Others....',
      router:'/working_in_progress'
    }
   
  ]

  constructor(private store:Store){
  }
  

  ngOnInit(): void {
    this.store.dispatch(INEOStateActions.getTasks({}))

  }
}
