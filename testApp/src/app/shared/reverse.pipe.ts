import { Pipe } from '@angular/core';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
  name: 'reverse'
})
export class ReversePipe {
  transform(value: string) {
    return value.split('').reverse().join('');
  }
}
