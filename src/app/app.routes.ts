import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"home",
        loadComponent:()=> import ("./home/home.component").then((mod)=> mod.HomeComponent)   
    },
    
    {
        path:"working_in_progress",
        loadComponent:()=> import ("./working-in-progress/working-in-progress.component").then((mod)=> mod.WorkingInProgressComponent)   
    },


];
