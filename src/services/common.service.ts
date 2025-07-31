import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import ApiUrl from '../common/constants';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public recordsData$ = new BehaviorSubject<any>(
   [
    {
      id:1,
      name:"Task 1",
      description:"Description 1",
      status:1,
      priority:1,
      dueDate:"2025-07-31",
      createdDate:"2025-07-31",
    },
    {
      id:2,
      name:"Task 2",
      description:"Description 2",
      status:2,
      priority:2,
      dueDate:"2025-07-28",
      createdDate:"2025-07-30",
    },
    {
      id:3,
      name:"Task 3",
      description:"Description 3",
      status:3,
      priority:3,
      dueDate:"2025-08-04",
      createdDate:"2025-07-29",
    }
  ]
  );

  constructor(private toastrService:ToastrService) { }
  getRecordsData():Observable<any> {
    return this.recordsData$.asObservable();
  }
  setTasksData(data:any){
    this.recordsData$.next(data);
  }
  getRecordById(id:any):Observable<any>{
    var tasks_list = this.recordsData$.getValue();
    const foundTask = tasks_list.find((task: any) => {
      return task.id == id;
    });
    return of(foundTask);
  }

  showToast(status:any,message:any){
    if(status){
      this.toastrService.success(message, '');
    }else{
      this.toastrService.error(message, '');
    }
  }
  addTask(data:any,id:any=0):Observable<any> {
    var tasks_data = this.recordsData$.getValue();
    const existingTask = tasks_data.find((task: any) =>
      task.name === data.name && task.id !== parseInt(id)
    );

    if (existingTask) {
      return of({ success: false, message: 'Task name already exists' });
    }
    if (id) {
      var task_index = tasks_data.findIndex((task: any) => task.id == id);
      if (task_index !== -1) {
        tasks_data[task_index] = data;
        this.setTasksData(tasks_data);
      } else {
        return of({ success: false, message: 'Task not found' });
      }
    } else {
      data.id = tasks_data.length + 1;
      data.createdDate = new Date().toLocaleDateString('en-CA');
      tasks_data.push(data);
      this.setTasksData(tasks_data);
    }

    return of({ success: true, message: 'Task saved successfully' });
  }
  deleteTask(id:any):Observable<any>{
    var tasks_data = this.recordsData$.getValue();
    const task_index = tasks_data.findIndex((task: any) => task.id == id);
    if (task_index !== -1) {
      tasks_data.splice(task_index, 1);
      this.setTasksData(tasks_data);
    } else {
      return of({ success: false, message: 'Task not found' });
    }
    return of({ success: true, message: 'Task deleted successfully' });
  }

}
