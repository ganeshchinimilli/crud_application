import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertObjectArray'
})
export class ConvertObjectArrayPipe implements PipeTransform {

  transform(value: any): any {
    return Object.entries(value).map(([key, value]) => ({ key, value }));
  }

}
