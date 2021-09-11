import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pidSearch'
})
export class PidSearchPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    switch (args.type) {
      case 'eGenie': {
        if (!args.name || args.name === '') {
          // console.log('Arg Null', args);
          return value;
        } else {
          // console.log('Arg Not Null', args);
          return value
          .filter(pid => pid.PID.toLowerCase().indexOf(args.name.toLowerCase()) >= 0);
        }
      }
      case 'specs': {
        if (!args.name || args.name === '') {
          return value;
        } else {
          return value
          .filter(pid => pid.Model.toLowerCase().indexOf(args.name.toLowerCase()) >= 0);
        }
      }
    }
  }

}
