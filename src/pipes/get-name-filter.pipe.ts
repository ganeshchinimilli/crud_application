import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNameFilter'
})
export class GetNameFilterPipe implements PipeTransform {

  transform(value:any,list_data:any):any {
    if(list_data){
      return list_data.find((item:any) => item.id == value)?.name
    }else{
      return value
    }
  }

}
