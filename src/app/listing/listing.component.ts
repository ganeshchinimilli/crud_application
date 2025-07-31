import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import constants from 'src/common/constants';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit,OnDestroy {
  recordsData:any = [];
  table_headers_list:any = {
    id:'S.No',
    name:'Name',
    description:'Description',
    status:'Status',
    priority:'Proiority',
    dueDate:'Due Date',
    createdDate:'Created Date',
    actions:'Actions'
  }
  PRIORITY_LIST:any = constants.PRIORITY_LIST;
  STATUS_LIST:any = constants.STATUS_LIST;
  filterData:any={
    name: '',
    status: '',
    priority: ''
  };
  allRecordsData:any;
  private unsubscribe$ = new Subject<void>();
  constructor(public commonService:CommonService,public router:Router,public activatedRoute:ActivatedRoute,public toast:ToastrService) {

  }
  ngOnInit(){
    this.getListData();
  }
  editRecord(id:any){
    this.router.navigate(['edit_task',id]);
  }
  deleteRecord(id:any){
    this.commonService.deleteTask(id).pipe(takeUntil(this.unsubscribe$)).subscribe((data:any) => {
      this.commonService.showToast(data.success,data.message);
    })

  }
  getListData(){
    this.commonService.getRecordsData().pipe(takeUntil(this.unsubscribe$)).subscribe((data:any) => {
      this.allRecordsData = data;
      this.recordsData = [...data];
    });

  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  filterDataFunc(data:any){
    this.filterData = data;
    this.recordsData = this.applyFilters();
  }
  applyFilters(){
    return this.allRecordsData.filter((item: any) => {
      // Name filter
      if (this.filterData?.name && this.filterData?.name.trim()) {
        if (!item.name || !item.name.toLowerCase().includes(this.filterData?.name.toLowerCase().trim())) {
          return false;
        }
      }
      if (this.filterData?.status && this.filterData?.status !== '') {
        if (item.status != this.filterData?.status) {
          return false;
        }
      }
      if (this.filterData?.priority && this.filterData?.priority !== '') {
        if (item.priority != this.filterData?.priority) {
          return false;
        }
      }
      return true;
    });
  }
}
