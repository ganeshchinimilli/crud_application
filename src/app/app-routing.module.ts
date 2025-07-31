import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  {
    path:'',
    component:ListingComponent
  },
  {
    path:'add_task',
    component:AddTaskComponent
  },
  {
    path:'edit_task/:id',
    component:AddTaskComponent
  },
  {
    path:'*',
    component:ListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
