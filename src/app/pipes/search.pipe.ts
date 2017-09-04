import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(records: Array<any>, searchText?: string): any {
    if(searchText == null) return records;

    return records.filter(rec => {
        
        return Object.keys(rec).some( x=> String(rec[x]).toLowerCase().includes(searchText.toLowerCase()));
    })
  }
}
