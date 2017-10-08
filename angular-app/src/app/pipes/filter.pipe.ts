import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

//   transform(value: any, filterString: string, propertyName: string): any {
//     if (value.length === 0 || filterString == '') {
//       return value;
//     }
//     const resultArray = [];
//     for (const item of value) {
//       if (item[propertyName].toLowerCase().includes(filterString.toLowerCase())) {
//         resultArray.push(item);
//       }
//     }
//     return resultArray;
//   }
//
// }

  transform(value: any, filterString: string, propertyName: string): any {
    if (value.length === 0 || filterString == '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      for (const child of item[propertyName]) {
        if (child['name'].toLowerCase().includes(filterString.toLowerCase())) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }
}

