import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Task } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {

  constructor(private http: HttpClient) {}

  getTasks(payload?:any):Observable<any>{
    const baseUrl = 'http://localhost:3000/tasks';
    let requests:any[] = [];
    
    // call api if we have fitlers
    if(payload.filters){

      if (payload.filters.id && payload.filters.id.length>0) {
        payload.filters.id.forEach((filterValue) => {
          requests.push(this.http.get<any>(`${baseUrl}?id=${filterValue}`));
        });
      }
  
      if (payload.filters.status && payload.filters.status.length>0) {
        const statusFilter = Array.isArray(payload.filters.status)
          ? payload.filters.status.join('&status=')
          : `status=${payload.filters.status}`;
        requests.push(this.http.get<any>(`${baseUrl}?status=${statusFilter}`));
      }
  
      if (payload.filters.title && payload.filters.title.length>0) {
        const titleFilter = Array.isArray(payload.filters.title)
          ? payload.filters.title.join('&title=')
          : `title=${payload.filters.title}`;
        requests.push(this.http.get<any>(`${baseUrl}?title=${titleFilter}`));
      }

      if (payload.filters.description && payload.filters.description.length>0) {
        const descriptionFilter = Array.isArray(payload.filters.description)
          ? payload.filters.description.join('&title=')
          : `description=${payload.filters.description}`;
        requests.push(this.http.get<any>(`${baseUrl}?description=${descriptionFilter}`));
      }
      
      if(Object.keys(payload.filters).length === 0){
        requests.push(this.http.get<any>(`${baseUrl}`));

      }
  
     
      return forkJoin(requests).pipe(
        // restituisce l'array
        map((tasks) => tasks.flat())
      );
    
    }else{

      return this.http.get<Task[]>(`http://localhost:3000/tasks/`)
    }
  }

  deleteTask(id:string){

    return this.http.delete(`http://localhost:3000/tasks/${id}`)
  }
  
  postTask(task:Task){
    
    task = {...task, status:"To Do"}
    
    return this.http.post(`http://localhost:3000/tasks/`, task)
  }

  editTask(task:Task){

    return this.http.put(`http://localhost:3000/tasks/${task.id}`, task)
  }
}
