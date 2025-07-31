import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import constants from 'src/common/constants';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm:FormGroup;
  edit_id:any;
  STATUS_LIST:any = constants.STATUS_LIST;
  PRIORITY_LIST:any = constants.PRIORITY_LIST;
  title:any='Add Task';
  constructor(public commonService:CommonService,public router:Router,public activatedRoute:ActivatedRoute,public fb:FormBuilder) {
    this.taskForm = this.fb.group({
      id:[''],
      name:['',Validators.required],
      description:['',Validators.required],
      status:['',Validators.required],
      priority:['',Validators.required],
      dueDate:['',Validators.required],
      createdDate:['']
    });
    this.activatedRoute.params.subscribe((params:any) => {
      if(params.id){
        this.edit_id = params.id;
      }
    })
  }
  ngOnInit() {
    if(this.edit_id){
      this.title = 'Edit Task';
      this.commonService.getRecordById(this.edit_id).subscribe((data:any) => {
        if(data){
          this.taskForm.patchValue(data);
        }else{
          this.commonService.showToast(false,'Task not found');
          this.router.navigate(['']);
        }
      })
    }

  }
  addTask(){
    if(this.taskForm.valid){
      var form_data = this.taskForm.value;
      this.commonService.addTask(form_data,this.edit_id).subscribe((data:any) => {
        if(data && data?.success){
          this.commonService.showToast(true,data.message);
          this.router.navigate(['']);
        }else{
          this.commonService.showToast(data.success,data.message);
        }
      })
    }else{
      this.taskForm.markAllAsTouched();
    }
  }
  goBack(){
    this.router.navigate(['']);
  }

}
