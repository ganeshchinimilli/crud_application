import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import constants from 'src/common/constants';

@Pipe({
  name: 'convertDateFormat'
})
export class ConvertDateFormatPipe implements PipeTransform {
  company_format = constants.COMPANY_DATE_FORMAT;
  constructor(private datePipe:DatePipe){

  }
  transform(value: any): any {
    if (!value) return '';
    let date = new Date(value);
    if (isNaN(date.getTime())) return value; // Return original value if invalid date
    return this.datePipe.transform(date, this.company_format);
  }

}
