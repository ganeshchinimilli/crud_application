import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertObjectArrayPipe } from './convert-object-array.pipe';
import { GetNameFilterPipe } from './get-name-filter.pipe';
import { ConvertDateFormatPipe } from './convert-date-format.pipe';



@NgModule({
  declarations: [
    ConvertObjectArrayPipe,
    GetNameFilterPipe,
    ConvertDateFormatPipe
  ],
  exports: [
    ConvertObjectArrayPipe,
    GetNameFilterPipe,
    ConvertDateFormatPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
