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

  transform(value: any, filterString: [string], propertyName: string): any {
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    let count = 0;
    const resultArray = [];
    for (const item of value) {
      for (const child of item[propertyName]) {
        for(const subString of filterString){
          if (subString != null) {
            if (child['name'].toLowerCase().includes(subString.toLowerCase())) {
              count++;
              console.log(child['name'])
            }
          }
        }
      }
      if (count >= 2) {
        resultArray.push(item);
      }
      count = 0;
    }
    return resultArray;
  }
}

