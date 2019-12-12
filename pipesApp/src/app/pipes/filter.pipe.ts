import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // * recalculate whenever data changes
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filterString: string, propName: string): any {
    if (values.length === 0 || filterString === '') { return values; }
    const filteredArray = values.filter(value => value[propName] === filterString);
    return filteredArray;
  }

}
