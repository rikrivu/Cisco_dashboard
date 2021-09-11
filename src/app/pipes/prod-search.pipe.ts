import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prodSearch'
})
export class ProdSearchPipe implements PipeTransform {

  transform(value: string[], args?: any): any {
    if (!args || !args.replace(/\s/g, '')) {
      return value;
    } else {
      return value.filter(prod => prod.toLowerCase().indexOf(args.toLowerCase()) >= 0);
    }
  }

}
