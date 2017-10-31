import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: any, propertyName: string, timeValue: number): any {
    // Return values as is if no search terms/ingredients
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }
    // Filter by recipe name and time
    const resultArray = [];
    if (propertyName === 'recipe') {
      for (const item of value) {
        let totalTime = item['cooktime']['prepTime'] +item['cooktime']['cookTime']
        if (item['name'].toLowerCase().includes(filterString[0].toLowerCase()) && totalTime < timeValue ) {
          resultArray.push(item);
        }
      }
    } else {
      // Filter by ingredients and time
      let count = 0;
      for (const item of value) {
        let totalTime = item['cooktime']['prepTime'] +item['cooktime']['cookTime']
        for (const child of item['ingredients']) {
          for(const subString of filterString){
            if (subString != null) {
              if (child['name'].toLowerCase().includes(subString.toLowerCase())) {
                count++;
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

