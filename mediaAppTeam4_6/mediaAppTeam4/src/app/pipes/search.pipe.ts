import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    if (typeof args[0] === 'undefined') return value

    return value.filter((news) => {
      return ((news.title.toUpperCase().indexOf(args[0].toUpperCase()) > -1)|| (news.description.toUpperCase().indexOf(args[0].toUpperCase())> -1))
    });
  }

}
