import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import constants from 'src/common/constants';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() filterData:any={
    name: '',
    status: '',
    priority: ''
  };
  @Output() filterEvent = new EventEmitter<any>();
  is_filter_applied:any=false;
  STATUS_LIST:any = constants.STATUS_LIST;
  PRIORITY_LIST:any = constants.PRIORITY_LIST;
  constructor(){

  }
  ngOnInit(){

  }
  filterDataFunc(){
    if(this.filterData?.name || this.filterData?.status || this.filterData?.priority){
        this.is_filter_applied = true;
    }else{
        this.is_filter_applied = false;
    }
    this.filterEvent.emit(this.filterData);
  }

  resetFilter(){
    this.filterData = {
      name: '',
      status: '',
      priority: ''
    };
    this.filterDataFunc();
  }
}
