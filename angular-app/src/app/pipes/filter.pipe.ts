import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  // transform(value: any, filterString: string, propertyName: string): any {
  //   if (value.length === 0 || filterString == '') {
  //     return value;
  //   }
  //   const resultArray = [];
  //   for (const item of value) {
  //     if (item[propertyName].toLowerCase().includes(filterString.toLowerCase())) {
  //       resultArray.push(item);
  //     }
  //   }
  //   return resultArray;
  // }



  transform(value: any, filterString: any, propertyName: string, timeValue: number): any {
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    // console.log("in pipe")
    const resultArray = [];
    if (propertyName === 'recipe') {
        for (const item of value) {
            let totalTime = item['cooktime']['prepTime'] +item['cooktime']['cookTime']
            console.log(totalTime)
            console.log(timeValue)
            if (item['name'].toLowerCase().includes(filterString[0].toLowerCase()) && totalTime < timeValue ) {
                resultArray.push(item);
            }
        }
    } else {
    let count = 0;
    for (const item of value) {
      let totalTime = item['cooktime']['prepTime'] +item['cooktime']['cookTime']
      for (const child of item['ingredients']) {
        for(const subString of filterString){
          if (subString != null) {
            if (child['name'].toLowerCase().includes(subString.toLowerCase())) {
              count++;
              console.log(child['name'])
            }
          }
        }
      }
      if (count >= 1 && totalTime < timeValue) {
        resultArray.push(item);
      }
      count = 0;
    }
  }
      return resultArray;
}
}

